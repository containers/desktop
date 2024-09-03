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

import { type Page } from '@playwright/test';
import { expect as playExpect, test } from '@playwright/test';

import { ResourceElementActions } from '../model/core/operations';
import { ContainerState, ResourceElementState } from '../model/core/states';
import type { ContainerInteractiveParams } from '../model/core/types';
import { ContainerDetailsPage } from '../model/pages/container-details-page';
import { CreateKindClusterPage } from '../model/pages/create-kind-cluster-page';
import { ResourceConnectionCardPage } from '../model/pages/resource-connection-card-page';
import { ResourcesPage } from '../model/pages/resources-page';
import { VolumesPage } from '../model/pages/volumes-page';
import { WelcomePage } from '../model/pages/welcome-page';
import { NavigationBar } from '../model/workbench/navigation';
import { StatusBar } from '../model/workbench/status-bar';
import { PodmanDesktopRunner } from '../runner/podman-desktop-runner';
import { deleteContainer, deleteImage, getVolumeNameForContainer } from '../utility/operations';
import { waitForPodmanMachineStartup } from '../utility/wait';

const RESOURCE_NAME: string = 'kind';
const EXTENSION_LABEL: string = 'podman-desktop.kind';
const CLUSTER_NAME: string = 'kind-cluster';
const KIND_CONTAINER_NAME: string = `${CLUSTER_NAME}-control-plane`;
const KUBERNETES_CONTEXT: string = `kind-${CLUSTER_NAME}`;
const CLUSTER_CREATION_TIMEOUT: number = 200000;
const IMAGE_TO_PULL: string = 'ghcr.io/linuxcontainers/alpine';
const IMAGE_TAG: string = 'latest';
const CONTAINER_NAME: string = 'alphine-container';
const NAMESPACE: string = 'default';
const DEPLOYED_POD_NAME: string = `${CONTAINER_NAME} ${KIND_CONTAINER_NAME} ${NAMESPACE}`;
const CONTAINER_START_PARAMS: ContainerInteractiveParams = { attachTerminal: false };

let pdRunner: PodmanDesktopRunner;
let page: Page;
let navigationBar: NavigationBar;
let resourcesPage: ResourcesPage;
let kindResourceCard: ResourceConnectionCardPage;
let statusBar: StatusBar;

const skipKindInstallation = process.env.SKIP_KIND_INSTALL ? process.env.SKIP_KIND_INSTALL : false;

test.beforeAll(async () => {
  pdRunner = new PodmanDesktopRunner();
  page = await pdRunner.start();
  pdRunner.setVideoAndTraceName('kind-e2e');
  const welcomePage = new WelcomePage(page);
  await welcomePage.handleWelcomePage(true);
  await waitForPodmanMachineStartup(page);
  navigationBar = new NavigationBar(page);
  resourcesPage = new ResourcesPage(page);
  kindResourceCard = new ResourceConnectionCardPage(page, RESOURCE_NAME);
  statusBar = new StatusBar(page);
});

test.afterAll(async () => {
  test.setTimeout(90000);
  try {
    await deleteContainer(page, CONTAINER_NAME);
    await deleteImage(page, IMAGE_TO_PULL);
  } finally {
    await pdRunner.close();
  }
});

test.describe.serial('Kind End-to-End Tests', () => {
  test.describe.serial('Kind installation', () => {
    test('Install Kind CLI', async () => {
      test.skip(!!skipKindInstallation, 'Skipping Kind installation');

      await statusBar.installKindCLI();
      await playExpect(statusBar.kindInstallationButton).not.toBeVisible();
      await navigationBar.openSettings();
      await playExpect.poll(async () => resourcesPage.resourceCardIsVisible(RESOURCE_NAME)).toBeTruthy();
    });

    test('Kind extension lifecycle', async () => {
      const extensionsPage = await navigationBar.openExtensions();
      const kindExtension = await extensionsPage.getInstalledExtension('Kind extension', EXTENSION_LABEL);
      await playExpect
        .poll(async () => await extensionsPage.extensionIsInstalled(EXTENSION_LABEL), { timeout: 10000 })
        .toBeTruthy();
      await playExpect(kindExtension.status).toHaveText('ACTIVE');
      await kindExtension.disableExtension();
      await navigationBar.openSettings();
      await playExpect.poll(async () => resourcesPage.resourceCardIsVisible(RESOURCE_NAME)).toBeFalsy();
      await navigationBar.openExtensions();
      await kindExtension.enableExtension();
      await navigationBar.openSettings();
      await playExpect.poll(async () => resourcesPage.resourceCardIsVisible(RESOURCE_NAME)).toBeTruthy();
    });
  });
  test.describe('Kind cluster operations', () => {
    test.skip(
      !!process.env.GITHUB_ACTIONS && process.env.RUNNER_OS === 'Linux',
      'Tests suite should not run on Linux platform',
    );
    test('Create a Kind cluster', async () => {
      test.setTimeout(CLUSTER_CREATION_TIMEOUT);

      await navigationBar.openSettings();
      await playExpect.poll(async () => resourcesPage.resourceCardIsVisible(RESOURCE_NAME)).toBeTruthy();
      await playExpect(kindResourceCard.markdownContent).toBeVisible();
      await playExpect(kindResourceCard.createButton).toBeVisible();
      await kindResourceCard.createButton.click();
      const createKindClusterPage = new CreateKindClusterPage(page);
      await createKindClusterPage.createClusterDefault(CLUSTER_NAME, CLUSTER_CREATION_TIMEOUT);
      await playExpect(kindResourceCard.resourceElement).toBeVisible();
      await playExpect(kindResourceCard.resourceElementConnectionStatus).toHaveText(ResourceElementState.Running, {
        timeout: 15000,
      });
    });

    test('Check resources added with the Kind cluster', async () => {
      const containersPage = await navigationBar.openContainers();
      await playExpect.poll(async () => containersPage.containerExists(KIND_CONTAINER_NAME)).toBeTruthy();
      const containerDetailsPage = await containersPage.openContainersDetails(KIND_CONTAINER_NAME);
      await playExpect.poll(async () => await containerDetailsPage.getState()).toEqual(ContainerState.Running);

      const volumesPage = new VolumesPage(page);
      const volumeName = await getVolumeNameForContainer(page, KIND_CONTAINER_NAME);
      if (!volumeName) {
        throw new Error(`Volume name for container "${KIND_CONTAINER_NAME}" is not defined.`);
      }
      const volumeDetailsPage = await volumesPage.openVolumeDetails(volumeName);
      await playExpect.poll(async () => await volumeDetailsPage.isUsed()).toBeTruthy();
    });

    test('Validate correct Kubernetes context is selected', async () => {
      await statusBar.validateKubernetesContext(KUBERNETES_CONTEXT);
    });

    test.describe('Deploy a container to the Kind cluster', () => {
      test('Pull an image and start a container', async () => {
        const imagesPage = await navigationBar.openImages();
        const pullImagePage = await imagesPage.openPullImage();
        await pullImagePage.pullImage(IMAGE_TO_PULL, IMAGE_TAG);
        await playExpect.poll(async () => imagesPage.waitForImageExists(IMAGE_TO_PULL, 10000)).toBeTruthy();
        const containersPage = await imagesPage.startContainerWithImage(
          IMAGE_TO_PULL,
          CONTAINER_NAME,
          CONTAINER_START_PARAMS,
        );
        await playExpect.poll(async () => containersPage.containerExists(CONTAINER_NAME)).toBeTruthy();
        const containerDetails = await containersPage.openContainersDetails(CONTAINER_NAME);
        await playExpect(containerDetails.heading).toBeVisible();
        await playExpect.poll(async () => containerDetails.getState()).toBe(ContainerState.Running);
      });

      test('Deploy the container ', async () => {
        const containerDetailsPage = new ContainerDetailsPage(page, CONTAINER_NAME);
        await playExpect(containerDetailsPage.heading).toBeVisible();
        const deployToKubernetesPage = await containerDetailsPage.openDeployToKubernetesPage();
        await deployToKubernetesPage.deployPod(CONTAINER_NAME, KUBERNETES_CONTEXT);

        const podsPage = await navigationBar.openPods();
        await playExpect.poll(async () => podsPage.deployedPodExists(DEPLOYED_POD_NAME, 'kubernetes')).toBeTruthy();
      });
    });

    test('Kind cluster operations - STOP', async () => {
      await navigationBar.openSettings();
      await playExpect(kindResourceCard.resourceElementConnectionStatus).toHaveText(ResourceElementState.Running);
      await kindResourceCard.performConnectionAction(ResourceElementActions.Stop);
      await playExpect(kindResourceCard.resourceElementConnectionStatus).toHaveText(ResourceElementState.Off, {
        timeout: 50000,
      });
    });

    test('Kind cluster operations - START', async () => {
      await kindResourceCard.performConnectionAction(ResourceElementActions.Start);
      await playExpect(kindResourceCard.resourceElementConnectionStatus).toHaveText(ResourceElementState.Running, {
        timeout: 50000,
      });
    });

    test('Kind cluster operatioms - RESTART', async () => {
      await kindResourceCard.performConnectionAction(ResourceElementActions.Restart);
      await playExpect(kindResourceCard.resourceElementConnectionStatus).toHaveText(ResourceElementState.Running, {
        timeout: 50000,
      });
    });

    test('Kind cluster operations - DELETE', async () => {
      await kindResourceCard.performConnectionAction(ResourceElementActions.Stop);
      await playExpect(kindResourceCard.resourceElementConnectionStatus).toHaveText(ResourceElementState.Off, {
        timeout: 50000,
      });
      await kindResourceCard.performConnectionAction(ResourceElementActions.Delete);
      await playExpect(kindResourceCard.markdownContent).toBeVisible({ timeout: 50000 });
      const containersPage = await navigationBar.openContainers();
      await playExpect
        .poll(async () => containersPage.containerExists(KIND_CONTAINER_NAME), { timeout: 10000 })
        .toBeFalsy();

      await page.waitForTimeout(2000);
      const volumeName = await getVolumeNameForContainer(page, KIND_CONTAINER_NAME);
      await playExpect.poll(async () => volumeName).toBeFalsy();
    });
  });
});
