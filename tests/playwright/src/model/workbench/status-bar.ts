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

import { expect as playExpect, type Locator, type Page } from '@playwright/test';

import { handleConfirmationDialog } from '../../utility/operations';
import { BasePage } from '../pages/base-page';

export class StatusBar extends BasePage {
  readonly kindInstallationButton: Locator;
  readonly kubernetesContext: Locator;

  constructor(page: Page) {
    super(page);
    this.kindInstallationButton = this.page.getByTitle(
      'Kind not found on your system, click to download and install it',
    );
    this.kubernetesContext = this.page.getByTitle('Current Kubernetes Context');
  }

  public async installKindCLI(): Promise<void> {
    await this.kindInstallationButton.click();
    await handleConfirmationDialog(this.page, 'Kind');
    await handleConfirmationDialog(this.page, 'Kind');
    await handleConfirmationDialog(this.page, 'Kind', true, 'OK');
  }

  public async validateKubernetesContext(context: string): Promise<void> {
    await playExpect(this.kubernetesContext).toBeVisible();
    await playExpect(this.kubernetesContext).toHaveText(context);
  }
}
