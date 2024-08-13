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

import type { Locator, Page } from '@playwright/test';
import { expect as playExpect } from '@playwright/test';

import { handleConfirmationDialog } from '../../utility/operations';
import { waitUntil, waitWhile } from '../../utility/wait';
import { VolumeState } from '../core/states';
import { CreateVolumePage } from './create-volume-page';
import { MainPage } from './main-page';
import { VolumeDetailsPage } from './volume-details-page';

export class VolumesPage extends MainPage {
  readonly createVolumeButton: Locator;
  readonly pruneVolumesButton: Locator;
  readonly collectUsageDataButton: Locator;

  constructor(page: Page) {
    super(page, 'volumes');
    this.createVolumeButton = this.additionalActions.getByRole('button', { name: 'Create' });
    this.pruneVolumesButton = this.additionalActions.getByRole('button', { name: 'Prune' });
    this.collectUsageDataButton = this.additionalActions.getByRole('button', { name: 'Gather volume sizes' });
  }

  public async getVolumeNameForContainer(containerName: string): Promise<string | undefined> {
    try {
      const rows = await this.getAllTableRows();
      for (let i = rows.length - 1; i >= 0; i--) {
        const volumeName = await rows[i].getByRole('cell').nth(3).getByRole('button').textContent();
        if (volumeName) {
          const volumeDetails = await this.openVolumeDetails(volumeName);
          await volumeDetails.activateTab(VolumeDetailsPage.SUMMARY_TAB);
          const volumeSummaryContent = await volumeDetails.tabContent.allTextContents();

          for (const content of volumeSummaryContent) {
            if (content.includes(containerName)) {
              await volumeDetails.backLink.click();
              return volumeName;
            }
          }
          await volumeDetails.backLink.click();
        }
      }
    } catch (err) {
      console.log(`Exception caught on ${this.title} page with message: ${err}`);
    }
  }

  async openCreateVolumePage(volumeName: string): Promise<CreateVolumePage> {
    const row = await this.getVolumeRowByName(volumeName);
    if (row !== undefined) {
      throw Error('Volume is already created');
    }

    await playExpect(this.createVolumeButton).toBeEnabled();
    await this.createVolumeButton.click();
    return new CreateVolumePage(this.page);
  }

  async openVolumeDetails(volumeName: string): Promise<VolumeDetailsPage> {
    const volumeRow = await this.getVolumeRowByName(volumeName);
    if (volumeRow === undefined) {
      throw Error(`Volume: ${volumeName} does not exist`);
    }
    const containerRowName = volumeRow.getByRole('cell').nth(3);
    await containerRowName.click();

    return new VolumeDetailsPage(this.page, volumeName);
  }

  async deleteVolume(volumeName: string): Promise<VolumesPage> {
    const volumeRow = await this.getVolumeRowByName(volumeName);
    if (volumeRow === undefined) {
      throw Error(`Volume: ${volumeName} does not exist`);
    }
    const containerRowDeleteButton = volumeRow.getByRole('button', { name: 'Delete Volume' });
    await playExpect(containerRowDeleteButton).toBeEnabled();
    await containerRowDeleteButton.click();
    await handleConfirmationDialog(this.page);

    return this;
  }

  async getVolumeRowByName(name: string): Promise<Locator | undefined> {
    return this.getRowFromTableByName(name);
  }

  protected async volumeExists(name: string): Promise<boolean> {
    const result = await this.getVolumeRowByName(name);
    return result !== undefined;
  }

  async countVolumesFromTable(): Promise<number> {
    return this.countRowsFromTable();
  }

  async countUsedVolumesFromTable(): Promise<number> {
    return (await this.getRowsFromTableByStatus(VolumeState.Used)).length;
  }

  async waitForVolumeExists(name: string): Promise<boolean> {
    await waitUntil(async () => await this.volumeExists(name));
    return true;
  }

  async waitForVolumeDelete(name: string): Promise<boolean> {
    await waitWhile(async () => await this.volumeExists(name));
    return true;
  }

  async pruneVolumes(): Promise<VolumesPage> {
    await playExpect(this.pruneVolumesButton).toBeEnabled();
    await this.pruneVolumesButton.click();
    await handleConfirmationDialog(this.page, 'Prune');
    return this;
  }
}
