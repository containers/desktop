/**********************************************************************
 * Copyright (C) 2023 Red Hat, Inc.
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

import type { CliTool, CliToolOptions, CliToolState, Disposable } from '@podman-desktop/api';
import type { CliToolInfo } from './api/cli-tool-info.js';
import type { ApiSenderType } from './api.js';
import type { Telemetry } from './telemetry/telemetry.js';
import type { Exec } from './util/exec.js';

type ExtensionInfo = {
  id: string;
  label: string;
};

export class CliToolImpl implements CliTool, Disposable {
  readonly id: string;
  private _state: CliToolState = 'unknown';

  constructor(
    private _apiSender: ApiSenderType,
    private _exec: Exec,
    readonly extensionInfo: ExtensionInfo,
    readonly registry: CliToolRegistry,
    private _options: CliToolOptions,
  ) {
    this.id = `${extensionInfo.id}.${_options.name}`;
  }

  get state() {
    return this._state;
  }

  get name() {
    return this._options.name;
  }

  get displayName() {
    return this._options.displayName;
  }

  get markdownDescription() {
    return this._options.markdownDescription;
  }

  get images() {
    return Object.freeze(this._options.images);
  }

  get version() {
    return this._options.version;
  }

  get location() {
    return this._options.location;
  }

  dispose(): void {
    this.registry.disposeCliTool(this);
  }
}

export class CliToolRegistry {
  constructor(
    private apiSender: ApiSenderType,
    private exec: Exec,
    private telemetryService: Telemetry,
  ) {}

  private cliTools = new Map<string, CliToolImpl>();

  createCliTool(extensionInfo: ExtensionInfo, options: CliToolOptions): CliTool {
    const cliTool = new CliToolImpl(this.apiSender, this.exec, extensionInfo, this, options);
    this.cliTools.set(cliTool.id, cliTool);
    this.apiSender.send('cli-tool-create');
    return cliTool;
  }

  disposeCliTool(cliTool: CliToolImpl): void {
    this.cliTools.delete(cliTool.id);
    this.apiSender.send('cli-tool-remove', cliTool.id);
  }

  getCliToolInfos(): CliToolInfo[] {
    return Array.from(this.cliTools.values()).map(cliTool => {
      const binary = !cliTool.version
        ? undefined
        : {
            version: cliTool.version,
            location: cliTool.location,
          };

      return {
        id: cliTool.id,
        name: cliTool.name,
        displayName: cliTool.displayName,
        description: cliTool.markdownDescription,
        state: cliTool.state,
        images: cliTool.images,
        providedBy: cliTool.extensionInfo.label,
        binary,
      };
    });
  }

  listCliTools(): CliTool[] {
    return Array.from(this.cliTools.values());
  }

  detectCliTool(cliToolId: string): void | PromiseLike<void> {
    return this.cliTools.get(cliToolId)?.detect();
  }
}
