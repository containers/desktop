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

import type { Page } from '@playwright/test';
import { test as base } from '@playwright/test';

import { WelcomePage } from '../model/pages/welcome-page';
import { NavigationBar } from '../model/workbench/navigation';
import { PodmanDesktopRunner } from '../runner/podman-desktop-runner';

export type TestFixtures = {
  pdRunner: PodmanDesktopRunner;
  navigationBar: NavigationBar;
  welcomePage: WelcomePage;
  page: Page;
};

export type PodmanDesktopRunnerOptions = {
  profile: string;
  customFolder: string;
  autoUpdate: boolean;
  autoCheckUpdate: boolean;
};

export const test = base.extend<TestFixtures & PodmanDesktopRunnerOptions>({
  profile: ['', { option: true }],
  customFolder: ['podman-desktop', { option: true }],
  autoUpdate: [true, { option: true }],
  autoCheckUpdate: [true, { option: true }],
  pdRunner: async ({ profile, customFolder, autoUpdate, autoCheckUpdate }, use) => {
    const pdRunner = await PodmanDesktopRunner.getInstance({ profile, customFolder, autoUpdate, autoCheckUpdate });
    await use(pdRunner);
  },
  page: async ({ pdRunner }, use) => {
    await use(pdRunner.getPage());
  },
  navigationBar: async ({ page }, use) => {
    const navBar = new NavigationBar(page);
    await use(navBar);
  },
  welcomePage: async ({ page }, use) => {
    const welcomePage = new WelcomePage(page);
    await use(welcomePage);
  },
});
export { expect } from '@playwright/test';
