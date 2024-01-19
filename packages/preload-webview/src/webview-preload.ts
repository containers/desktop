/**********************************************************************
 * Copyright (C) 2024 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

import type { WebviewInfo } from '../../main/src/plugin/api/webview-info';

import type { IpcRendererEvent } from 'electron';
import { contextBridge, ipcRenderer } from 'electron';

interface ErrorMessage {
  name: string;
  message: string;
  extra: unknown;
}

export class WebviewPreload {
  #webviewId: string;
  #webviewInfo: WebviewInfo | undefined;
  #domLoaded: boolean = false;
  #acquiredApi: boolean = false;

  constructor(webviewId: string) {
    this.#webviewId = webviewId;
  }

  protected decodeError(error: ErrorMessage) {
    const e = new Error(error.message);
    e.name = error.name;
    Object.assign(e, error.extra);
    return e;
  }

  protected async ipcInvoke(channel: string, ...args: unknown[]): Promise<unknown> {
    const { error, result } = await ipcRenderer.invoke(channel, ...args);
    if (error) {
      throw this.decodeError(error);
    }
    return result;
  }

  protected postWebviewMessage(message: unknown) {
    this.ipcInvoke('webviewRegistry:post-message', this.#webviewInfo?.id, message).catch((error: unknown) =>
      console.error('Error while posting message', error),
    );
  }

  protected changeContent() {
    if (!this.#webviewInfo) {
      return;
    }
    if (!this.#domLoaded) {
      return;
    }
    let webviewHtmlContent = '';
    if (this.#webviewInfo) {
      webviewHtmlContent = this.#webviewInfo.html;
    }
    // use a timeout to perform the update
    setTimeout(() => {
      const webviewContentHtml = new DOMParser().parseFromString(webviewHtmlContent, 'text/html');

      webviewContentHtml.documentElement.style.setProperty('font-family', 'Montserrat');

      const htmlContent = '<!DOCTYPE html>\n' + webviewContentHtml.documentElement.outerHTML;

      document.open();
      document.write(htmlContent);
      document.close();
    }, 0);
  }

  // build the function that will be exposed to the webview for getState/postMessage/setState
  protected buildApi(): unknown {
    return () => {
      // initialize the state from the webview
      let state: unknown = this.#webviewInfo?.state ?? {};
      if (this.#acquiredApi) {
        throw new Error('An instance of the Podman Desktop API has already been acquired');
      }
      // can only be called once;
      this.#acquiredApi = true;
      return Object.freeze({
        getState: () => {
          return state;
        },
        postMessage: (msg: unknown) => {
          return this.postWebviewMessage({ command: 'onmessage', data: msg });
        },
        setState: async (newState: unknown) => {
          state = newState;
          // need to send back the state to the main process
          this.ipcInvoke('webviewRegistry:update-state', this.#webviewInfo?.id, newState).catch((error: unknown) => {
            console.error('Error while updating the state', error);
          });
        },
      });
    };
  }

  protected getWebviews(): Promise<WebviewInfo[]> {
    return this.ipcInvoke('webviewRegistry:listWebviews') as Promise<WebviewInfo[]>;
  }

  protected ipcRendererOn(channel: string, listener: (event: IpcRendererEvent, ...args: unknown[]) => void) {
    ipcRenderer.on(channel, listener);
  }

  async init(): Promise<void> {
    window.addEventListener('DOMContentLoaded', () => {
      this.#domLoaded = true;
      this.changeContent();
    });

    contextBridge.exposeInMainWorld('acquirePodmanDesktopApi', this.buildApi());

    const webviews: WebviewInfo[] = await this.getWebviews();
    this.#webviewInfo = webviews.find(webview => webview.id === this.#webviewId);
    this.changeContent();

    // broadcast messages from the main process to the webview
    this.ipcRendererOn('webview-post-message', (_, target: unknown) => {
      const targetData = target as { message: unknown };
      window.dispatchEvent(new MessageEvent('message', { data: targetData.message }));
    });

    this.ipcRendererOn('webview-update-html', (_, html) => {
      if (this.#webviewInfo) {
        this.#webviewInfo.html = html as string;
        this.changeContent();
      }
    });
  }
}
