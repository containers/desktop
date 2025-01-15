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

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Page } from '@playwright/test';

import { CLIToolsPage } from '../model/pages/cli-tools-page';
import { ComposeLocalInstallPage } from '../model/pages/compose-onboarding/compose-local-install-page';
import { ComposeOnboardingPage } from '../model/pages/compose-onboarding/compose-onboarding-page';
import { ComposeVersionPage } from '../model/pages/compose-onboarding/compose-version-page';
import { ComposeWideInstallPage } from '../model/pages/compose-onboarding/compose-wide-install-page';
import { ResourceCliCardPage } from '../model/pages/resource-cli-card-page';
import { ResourcesPage } from '../model/pages/resources-page';
import { SettingsBar } from '../model/pages/settings-bar';
import type { NavigationBar } from '../model/workbench/navigation';
import { expect as playExpect, test } from '../utility/fixtures';
import { deleteContainer, deleteImage, runComposeUpFromCLI } from '../utility/operations';
import { isCI, isLinux } from '../utility/platform';

const RESOURCE_NAME: string = 'Compose';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendContainerName = 'backend-1';
const frontendContainerName = 'frontend-1';
const backendImageName = 'quay.io/podman-desktop-demo/podify-demo-backend';
const frontendImageName = 'quay.io/podman-desktop-demo/podify-demo-frontend';

let composeVersion: string;
// property that will make sure that on linux we can run only partial tests, by default this is turned off
const composePartialInstallation = process.env.COMPOSE_PARTIAL_INSTALL ? process.env.COMPOSE_PARTIAL_INSTALL : false;

test.skip(!!isCI && isLinux, 'Tests suite should not run on Linux platform');

test.beforeAll(async ({ runner, welcomePage }) => {
  runner.setVideoAndTraceName('compose-onboarding-e2e');
  await welcomePage.handleWelcomePage(true);
});

test.afterAll(async ({ page, runner }) => {
  try {
    await deleteContainer(page, backendContainerName);
    await deleteContainer(page, frontendContainerName);
    await deleteImage(page, backendImageName);
    await deleteImage(page, frontendImageName);
  } finally {
    await runner.close();
  }
});

test.describe.serial('Compose onboarding workflow verification', { tag: '@smoke' }, () => {
  test.afterEach(async ({ navigationBar }) => {
    await navigationBar.openDashboard();
  });

  test('Compose onboarding button Setup is available', async ({ page, navigationBar }) => {
    await navigationBar.openSettings();
    const settingsBar = new SettingsBar(page);
    const resourcesPage = await settingsBar.openTabPage(ResourcesPage);

    await playExpect.poll(async () => resourcesPage.resourceCardIsVisible(RESOURCE_NAME)).toBeTruthy();
    const composeResourceCard = new ResourceCliCardPage(page, RESOURCE_NAME);
    await composeResourceCard.card.scrollIntoViewIfNeeded();
    const setupButton = composeResourceCard.setupButton;
    await playExpect(
      setupButton,
      'Compose Setup button is not present, perhaps compose is already installed',
    ).toBeVisible({ timeout: 10000 });
  });

  test('Can enter Compose onboarding', async ({ page, navigationBar }) => {
    const onboardingPage = await openComposeOnboarding(page, navigationBar);

    await playExpect(onboardingPage.heading).toBeVisible();

    const onboardingVersionPage = new ComposeVersionPage(page);
    await playExpect(onboardingVersionPage.onboardingStatusMessage).toHaveText('Compose download');
    await playExpect(onboardingVersionPage.versionStatusMessage).toBeVisible();

    composeVersion = await onboardingVersionPage.getVersion();
  });

  test('Can install Compose locally', async ({ page, navigationBar }) => {
    const onboardingPage = await openComposeOnboarding(page, navigationBar);
    await onboardingPage.nextStepButton.click();

    const onboardigLocalPage = new ComposeLocalInstallPage(page);
    await playExpect(onboardigLocalPage.onboardingStatusMessage).toHaveText('Compose successfully Downloaded', {
      timeout: 50000,
    });

    await onboardingPage.cancelSetupButtion.click();

    const skipDialog = page.getByRole('dialog', { name: 'Skip Setup Popup', exact: true });
    const skipOkButton = skipDialog.getByRole('button', { name: 'Ok' });
    await skipOkButton.click();
  });

  test('Can resume Compose onboarding and it can be canceled', async ({ page, navigationBar }) => {
    await openComposeOnboarding(page, navigationBar);
    const onboardingLocalPage = new ComposeLocalInstallPage(page);

    await playExpect(onboardingLocalPage.onboardingStatusMessage).toHaveText('Compose successfully Downloaded');
    await playExpect(onboardingLocalPage.wideDownloadAvailableMessage).toBeVisible();
    await playExpect(onboardingLocalPage.nextStepButton).toBeVisible();
    await onboardingLocalPage.cancelSetupButtion.click();

    const skipDialog = page.getByRole('dialog', { name: 'Skip Setup Popup', exact: true });
    const skipOkButton = skipDialog.getByRole('button', { name: 'Ok' });
    await skipOkButton.click();
  });

  test('Can install Compose system-wide', async ({ page, navigationBar }) => {
    test.skip(!!composePartialInstallation, 'Partial installation of Compose is enabled');

    const onboardingPage = await openComposeOnboarding(page, navigationBar);
    await onboardingPage.nextStepButton.click();

    const onboardingWidePage = new ComposeWideInstallPage(page);
    await playExpect(onboardingWidePage.onboardingStatusMessage).toHaveText('Compose installed', { timeout: 50000 });
    await playExpect(onboardingWidePage.mainPage.getByRole('heading', { name: 'How To Use Compose' })).toBeVisible();
    await playExpect(onboardingWidePage.composeCommandMessage).toBeVisible();
    await playExpect(onboardingWidePage.nextStepButton).toBeEnabled();
    await onboardingWidePage.nextStepButton.click();
    // expects redirection to the Resources page
    const resourcesPage = new ResourcesPage(page);
    await playExpect(resourcesPage.heading).toBeVisible();
  });

  test('Verify Compose was installed', async ({ page, navigationBar }) => {
    test.skip(!!composePartialInstallation, 'Partial installation of Compose is enabled');

    await navigationBar.openSettings();
    const settingsBar = new SettingsBar(page);
    const resourcesPage = await settingsBar.openTabPage(ResourcesPage);
    await playExpect.poll(async () => await resourcesPage.resourceCardIsVisible(RESOURCE_NAME)).toBeTruthy();
    const composeBox = new ResourceCliCardPage(page, RESOURCE_NAME);
    const setupButton = composeBox.setupButton;
    await playExpect(setupButton).toBeHidden();

    const cliToolsPage = await settingsBar.openTabPage(CLIToolsPage);
    const composeRow = cliToolsPage.toolsTable.getByLabel(RESOURCE_NAME);
    const composeVersionInfo = composeRow.getByLabel('cli-version');
    await playExpect(composeVersionInfo).toContainText('docker-compose ' + composeVersion);
  });

  test('Check Podman Desktop autorefresh when using podman compose up', async ({ navigationBar }) => {
    test.setTimeout(300_000);

    const composeFilePath = path.resolve(__dirname, '..', '..', 'resources', `compose.yaml`);
    await runComposeUpFromCLI(composeFilePath);

    const containersPage = await navigationBar.openContainers();
    await playExpect(containersPage.heading).toBeVisible();

    await playExpect
      .poll(async () => await containersPage.containerExists(backendContainerName), { timeout: 120_000 })
      .toBeTruthy();
    await playExpect
      .poll(async () => await containersPage.containerExists(frontendContainerName), { timeout: 120_000 })
      .toBeTruthy();

    const imagesPage = await navigationBar.openImages();
    await playExpect(imagesPage.heading).toBeVisible();

    await playExpect.poll(async () => await imagesPage.waitForImageExists(backendImageName)).toBeTruthy();
    await playExpect.poll(async () => await imagesPage.waitForImageExists(frontendImageName)).toBeTruthy();
  });
});

async function openComposeOnboarding(page: Page, navigationBar: NavigationBar): Promise<ComposeOnboardingPage> {
  await navigationBar.openSettings();
  const settingsBar = new SettingsBar(page);
  const resourcesPage = await settingsBar.openTabPage(ResourcesPage);
  await playExpect(resourcesPage.heading).toBeVisible();
  await playExpect.poll(async () => await resourcesPage.resourceCardIsVisible(RESOURCE_NAME)).toBeTruthy();
  const composeResourceCard = new ResourceCliCardPage(page, RESOURCE_NAME);
  await composeResourceCard.card.scrollIntoViewIfNeeded();
  const setupButton = composeResourceCard.setupButton;
  await playExpect(
    setupButton,
    'Compose Setup button is not present, perhaps compose is already installed',
  ).toBeVisible({ timeout: 10000 });
  await setupButton.click();
  return new ComposeOnboardingPage(page);
}
