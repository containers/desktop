/**********************************************************************
 * Copyright (C) 2023-2024 Red Hat, Inc.
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

import { expect, type Locator, type Page } from '@playwright/test';

import { ContainersPage } from '../pages/containers-page';
import { DashboardPage } from '../pages/dashboard-page';
import { ExtensionsPage } from '../pages/extensions-page';
import { ImagesPage } from '../pages/images-page';
import { KubernetesBar } from '../pages/kubernetes-bar';
import { PodsPage } from '../pages/pods-page';
import { SettingsBar } from '../pages/settings-bar';
import { VolumesPage } from '../pages/volumes-page';

export class NavigationBar {
  readonly page: Page;
  readonly navigationLocator: Locator;
  readonly imagesLink: Locator;
  readonly containersLink: Locator;
  readonly volumesLink: Locator;
  readonly podsLink: Locator;
  readonly dashboardLink: Locator;
  readonly settingsLink: Locator;
  readonly extensionsLink: Locator;
  readonly kubernetesLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigationLocator = this.page.getByRole('navigation', { name: 'AppNavigation' });
    this.imagesLink = this.page.getByRole('link', { name: 'Images' });
    this.containersLink = this.page.getByRole('link', { name: 'Containers' }).nth(0);
    this.podsLink = this.page.getByRole('link', { name: 'Pods' });
    this.volumesLink = this.page.getByRole('link', { name: 'Volumes' });
    this.dashboardLink = this.page.getByRole('link', { name: 'Dashboard' });
    this.settingsLink = this.page.getByRole('link', { name: 'Settings' });
    this.extensionsLink = this.navigationLocator.getByRole('link', { name: 'Extensions', exact: true });
    this.kubernetesLink = this.navigationLocator.getByRole('link', { name: 'Kubernetes' });
  }

  async openDashboard(): Promise<DashboardPage> {
    await this.dashboardLink.waitFor({ state: 'visible' });
    await this.dashboardLink.click();
    return new DashboardPage(this.page);
  }

  async openImages(): Promise<ImagesPage> {
    await this.imagesLink.waitFor({ state: 'visible' });
    await this.imagesLink.click();
    return new ImagesPage(this.page);
  }

  async openContainers(): Promise<ContainersPage> {
    await this.containersLink.waitFor({ state: 'visible' });
    await this.containersLink.click();
    return new ContainersPage(this.page);
  }

  async openPods(): Promise<PodsPage> {
    await this.podsLink.waitFor({ state: 'visible' });
    await this.podsLink.click();
    return new PodsPage(this.page);
  }

  async openSettings(): Promise<SettingsBar> {
    const settingsBar = new SettingsBar(this.page);
    if (!(await settingsBar.settingsNavBar.isVisible())) {
      await expect(this.settingsLink).toBeVisible();
      await this.settingsLink.click();
    }
    return settingsBar;
  }

  async openVolumes(): Promise<VolumesPage> {
    await this.volumesLink.waitFor({ state: 'visible' });
    await this.volumesLink.click();
    return new VolumesPage(this.page);
  }

  async openKubernetes(): Promise<KubernetesBar> {
    const kubernetesBar = new KubernetesBar(this.page);
    if (!(await kubernetesBar.kubernetesNavBar.isVisible())) {
      await expect(this.kubernetesLink).toBeVisible();
      await this.kubernetesLink.click();
    }
    return new KubernetesBar(this.page);
  }

  async openExtensions(): Promise<ExtensionsPage> {
    await this.extensionsLink.waitFor({ state: 'visible' });
    await this.extensionsLink.click();
    return new ExtensionsPage(this.page);
  }
}
