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

import type { Locator, Page } from '@playwright/test';

import { BasePage } from './base-page';

export interface ContainerInteractiveParams {
  interactive?: boolean;
  attachTerminal?: boolean;
}

export class RunImagePage extends BasePage {
  readonly name: Locator;
  readonly heading: Locator;
  readonly closeLink: Locator;
  readonly backToImageDetailsLink: Locator;
  readonly imageName: string;
  readonly startContainerButton: Locator;
  readonly errorAlert: Locator;

  constructor(page: Page, name: string) {
    super(page);
    this.imageName = name;
    this.name = page.getByLabel('name').and(page.getByText('Run Image'));
    this.heading = page.getByRole('heading', { name: this.imageName });
    this.closeLink = page.getByRole('link', { name: 'Close' });
    this.errorAlert = page.getByRole('alert', { name: 'Error Message Content' });
    this.backToImageDetailsLink = page.getByRole('link', { name: 'Go back to Image Details' });
    this.startContainerButton = page.getByRole('button', { name: 'Start Container' });
  }

  async activateTab(name: string): Promise<void> {
    const tabactive = this.page.getByRole('link', { name: name, exact: true }).and(this.page.getByText(name));
    await tabactive.click();
  }

  // If the container has a defined exposed port, the mapping offers only one part of the input box, host port
  // Example of the placeholder: 'Enter value for port 80/tcp' : settable value
  async setHostPortToExposedContainerPort(exposedPort: string, port: string): Promise<void> {
    await this.activateTab('Basic');
    const portMapping = this.page
      .getByRole('textbox')
      .and(this.page.getByPlaceholder(`Enter value for port ${exposedPort}/tcp`));
    await portMapping.waitFor({ state: 'visible', timeout: 1000 });
    await portMapping.fill(port);
  }

  async startContainer(customName = '', optionalParams?: ContainerInteractiveParams): Promise<void> {
    if (customName !== '') {
      await this.activateTab('Basic');
      // ToDo: improve UI side with aria-labels
      const textbox = this.page.locator(`input[type='text'][name='modalContainerName']`);
      await textbox.fill(customName);
    }

    if (optionalParams?.attachTerminal !== undefined) {
      // disable the checkbox in advanced tab
      await this.activateTab('Advanced');
      const checkbox = this.page.getByRole('checkbox', { name: 'Attach a pseudo terminal' });
      optionalParams.attachTerminal ? await checkbox.check() : await checkbox.uncheck();
    }

    if (optionalParams?.interactive !== undefined) {
      // disable the checkbox in advanced tab
      await this.activateTab('Advanced');
      const checkbox = this.page.getByRole('checkbox', { name: 'Interactive: Keep STDIN' });
      optionalParams.interactive ? await checkbox.check() : await checkbox.uncheck();
    }

    await this.activateTab('Basic');
    await this.startContainerButton.waitFor({ state: 'visible', timeout: 1000 });
    // If the start button is not enabled, we can expect an error in the form to be visible
    if (!(await this.startContainerButton.isEnabled())) {
      console.log('Start Container Button is not enabled.');
      await this.errorAlert.waitFor({ state: 'visible', timeout: 1000 });
      const errMessage = await this.errorAlert.innerText({ timeout: 1000 });
      throw Error(`Start Button not enabled: ${errMessage}`);
    }
    await this.startContainerButton.click();
    // After clicking on the button there seems to be for possible outcomes
    // 1. Opening particular container's details page with tty tab opened
    // 2. Opening Containers page with new container on it
    // 3. staying on the run image page with an error
    // 4. Starting a container without entrpoint or command creates a container, but it stays on Run Image Page without error
    if ((await this.errorAlert.count()) > 0 && (await this.name.isVisible())) {
      // button is still on the screen, we did not move out of Run Image page
      throw Error(`Starting the container threw an error: ${await this.errorAlert.innerText({ timeout: 2000 })}`);
    }
  }

  async setCustomPortMapping(customPortMapping: string): Promise<void> {
    // add port mapping
    await this.activateTab('Basic');
    const addPortMappingButton = this.page.getByRole('button', { name: 'Add custom port mapping' });
    await addPortMappingButton.click();
    const hostPort = this.page.getByLabel('host port');
    const containerPort = this.page.getByLabel('container port');
    await hostPort.fill(customPortMapping.split(':')[0]);
    await containerPort.fill(customPortMapping.split(':')[1]);
  }
}
