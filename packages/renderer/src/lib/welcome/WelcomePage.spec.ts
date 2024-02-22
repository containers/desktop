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

/* eslint-disable @typescript-eslint/no-explicit-any */

import '@testing-library/jest-dom/vitest';
import { beforeAll, test, expect, vi, afterAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import WelcomePage from './WelcomePage.svelte';
import { get, type Unsubscriber } from 'svelte/store';
import { router } from 'tinro';
import { featuredExtensionInfos } from '/@/stores/featuredExtensions';
import type { FeaturedExtension } from '../../../../main/src/plugin/featured/featured-api';
import { onboardingList } from '/@/stores/onboarding';

let routerUnsubscribe: Unsubscriber;
let path: string;

const getFeaturedExtensionsMock = vi.fn();
const getProviderInfosMock = vi.fn();

// fake the window.events object
beforeAll(() => {
  (window as any).getConfigurationValue = vi.fn();
  (window as any).updateConfigurationValue = vi.fn();
  (window as any).getPodmanDesktopVersion = vi.fn();
  (window as any).telemetryConfigure = vi.fn();
  (window as any).getFeaturedExtensions = getFeaturedExtensionsMock;
  (window as any).getProviderInfos = getProviderInfosMock;
  (window.events as unknown) = {
    receive: (_channel: string, func: any) => {
      func();
    },
  };

  routerUnsubscribe = router.subscribe(rtr => {
    path = rtr.path;
  });
});

afterAll(() => {
  routerUnsubscribe();
});

async function waitRender(customProperties: object): Promise<void> {
  const result = render(WelcomePage, { ...customProperties });
  // wait that result.component.$$.ctx[0] is set
  while (result.component.$$.ctx[0] === undefined) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

test('Expect the close button is on the page', async () => {
  await waitRender({ showWelcome: true });
  const button = screen.getByRole('button', { name: 'Go to Podman Desktop' });
  expect(button).toBeInTheDocument();
  expect(button).toBeEnabled();
});

test('Expect the settings button is on the page', async () => {
  await waitRender({ showWelcome: true });
  const button = screen.getByRole('button', { name: 'Settings' });
  expect(button).toBeInTheDocument();
  expect(button).toBeEnabled();
});

test('Expect that the close button closes the window', async () => {
  await waitRender({ showWelcome: true });
  const button = screen.getByRole('button', { name: 'Go to Podman Desktop' });
  await fireEvent.click(button);
  // and the button is gone
  expect(button).not.toBeInTheDocument();
});

test('Expect that the settings button closes the window and opens the settings', async () => {
  await waitRender({ showWelcome: true });

  const button = screen.getByRole('button', { name: 'Settings' });
  await fireEvent.click(button);

  // and the button is gone
  expect(button).not.toBeInTheDocument();

  // and we're in the preferences
  expect(path).toBe('/preferences');
});

test('Expect that telemetry UI is hidden when telemetry has already been prompted', async () => {
  await waitRender({ showWelcome: true, showTelemetry: false });
  let checkbox;
  try {
    checkbox = screen.getByRole('checkbox', { name: 'Enable telemetry' });
  } catch {
    // ignore errors
  }
  expect(checkbox).toBe(undefined);
});

test('Expect that telemetry UI is visible when necessary', async () => {
  await waitRender({ showWelcome: true, showTelemetry: true });
  const checkbox = screen.getByRole('checkbox', { name: 'Enable telemetry' });
  expect(checkbox).toBeInTheDocument();
});

test('Expect welcome screen to show three onboarding providers', async () => {
  onboardingList.set([
    {
      extension: 'id',
      title: 'onboarding',
      name: 'foobar1',
      displayName: 'FooBar1',
      icon: 'data:image/png;base64,foobar1',
      steps: [
        {
          id: 'step',
          title: 'step',
          state: 'failed',
          completionEvents: [],
        },
      ],
      enablement: 'true',
    },
    {
      extension: 'id',
      title: 'onboarding',
      name: 'foobar2',
      displayName: 'FooBar2',
      icon: 'data:image/png;base64,foobar2',
      steps: [
        {
          id: 'step',
          title: 'step',
          state: 'failed',
          completionEvents: [],
        },
      ],
      enablement: 'true',
    },
    {
      extension: 'id',
      title: 'onboarding',
      name: 'foobar3',
      displayName: 'FooBar3',
      icon: 'data:image/png;base64,foobar3',
      steps: [
        {
          id: 'step',
          title: 'step',
          state: 'failed',
          completionEvents: [],
        },
      ],
      enablement: 'true',
    },
  ]);

  // wait until the onboarding list is populated
  while (get(onboardingList).length === 0) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  await waitRender({ showWelcome: true });

  // wait until aria-label 'providerList' is populated
  while (screen.queryAllByLabelText('providerList').length === 0) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Check that the logos for foobar1, foobar2, and foobar3 are present
  const image1 = screen.getByRole('img', { name: 'foobar1 logo' });
  expect(image1).toBeInTheDocument();
  expect(image1).toHaveAttribute('src', 'data:image/png;base64,foobar1');

  const image2 = screen.getByRole('img', { name: 'foobar2 logo' });
  expect(image2).toBeInTheDocument();
  expect(image2).toHaveAttribute('src', 'data:image/png;base64,foobar2');

  const image3 = screen.getByRole('img', { name: 'foobar3 logo' });
  expect(image3).toBeInTheDocument();
  expect(image3).toHaveAttribute('src', 'data:image/png;base64,foobar3');
});

test('Expect that featured extensions are displayed', async () => {
  const featuredExtension1: FeaturedExtension = {
    builtin: true,
    id: 'foo.bar',
    displayName: 'FooBar',
    description: 'Foobar description',
    icon: 'data:image/png;base64,foobar',
    categories: [],
    fetchable: true,
    fetchLink: 'oci-hello/world',
    fetchVersion: '1.2.3',
    installed: true,
  };

  const featuredExtension2: FeaturedExtension = {
    builtin: true,
    id: 'foo.baz',
    displayName: 'FooBaz',
    description: 'Foobaz description',
    icon: 'data:image/png;base64,foobaz',
    categories: [],
    fetchable: false,
    installed: false,
  };

  getFeaturedExtensionsMock.mockResolvedValue([featuredExtension1, featuredExtension2]);

  // ask to update the featured Extensions store
  window.dispatchEvent(new CustomEvent('system-ready'));

  // wait store are populated
  while (get(featuredExtensionInfos).length === 0) {
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  await waitRender({ showWelcome: true });

  const imageExt1 = screen.getByRole('img', { name: 'FooBar logo' });
  // expect the image to be there
  expect(imageExt1).toBeInTheDocument();
  // expect image source is correct
  expect(imageExt1).toHaveAttribute('src', 'data:image/png;base64,foobar');

  const imageExt2 = screen.getByRole('img', { name: 'FooBaz logo' });
  // expect the image to be there
  expect(imageExt2).toBeInTheDocument();
  // expect image source is correct
  expect(imageExt2).toHaveAttribute('src', 'data:image/png;base64,foobaz');
});

test('Expect that if the onboarding extension has the same name as featured extension, the featured extension wont be shown', async () => {
  onboardingList.set([
    {
      extension: 'id',
      title: 'onboarding',
      name: 'foo.bar',
      displayName: 'FooBar',
      icon: 'data:image/png;base64,foobar',
      steps: [
        {
          id: 'step',
          title: 'step',
          state: 'failed',
          completionEvents: [],
        },
      ],
      enablement: 'true',
    },
  ]);

  // wait until the onboarding list is populated
  while (get(onboardingList).length === 0) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  const featuredExtension1: FeaturedExtension = {
    builtin: true,
    id: 'foo.bar',
    displayName: 'FooBar',
    description: 'Foobar description',
    icon: 'data:image/png;base64,foobar',
    categories: [],
    fetchable: true,
    fetchLink: 'oci-hello/world',
    fetchVersion: '1.2.3',
    installed: true,
  };

  getFeaturedExtensionsMock.mockResolvedValue([featuredExtension1]);

  // ask to update the featured Extensions store
  window.dispatchEvent(new CustomEvent('system-ready'));

  // wait store are populated
  while (get(featuredExtensionInfos).length === 0) {
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  await waitRender({ showWelcome: true });

  // Expect 'FooBar' logo to only be shown once, not twice.
  const imageExt = screen.getAllByRole('img', { name: 'FooBar logo' });
  expect(imageExt.length).toBe(1);

  // Expect the title to be shown only once as well
  const titleExt = screen.getAllByText('FooBar');
  expect(titleExt.length).toBe(1);
});

test('If onboarding is pending / waiting to be setup for a provider, have it already checked.', async () => {
  getProviderInfosMock.mockResolvedValue([
    {
      id: 'foobar1',
      name: 'foobar1',
      extensionId: 'podman-desktop.foobar1',
      images: {
        icon: 'img',
      },
      status: 'started',
      warnings: [],
      containerProviderConnectionCreation: true,
      detectionChecks: [],
      containerConnections: [
        {
          name: 'machine',
          status: 'started',
          endpoint: {
            socketPath: 'socket',
          },
          lifecycleMethods: ['start', 'stop', 'delete'],
          type: 'podman',
        },
      ],
      installationSupport: false,
      internalId: '0',
      kubernetesConnections: [],
      kubernetesProviderConnectionCreation: true,
      links: [],
      containerProviderConnectionInitialization: false,
      containerProviderConnectionCreationDisplayName: 'Podman machine',
      kubernetesProviderConnectionInitialization: false,
      cleanupSupport: false,
    },
    {
      id: 'foobar2',
      name: 'foobar2',
      extensionId: 'podman-desktop.foobar2',
      images: {
        icon: 'img',
      },
      status: 'not-installed',
      warnings: [],
      containerProviderConnectionCreation: true,
      detectionChecks: [],
      containerConnections: [
        {
          name: 'machine',
          status: 'started',
          endpoint: {
            socketPath: 'socket',
          },
          lifecycleMethods: ['start', 'stop', 'delete'],
          type: 'podman',
        },
      ],
      installationSupport: false,
      internalId: '0',
      kubernetesConnections: [],
      kubernetesProviderConnectionCreation: true,
      links: [],
      containerProviderConnectionInitialization: false,
      containerProviderConnectionCreationDisplayName: 'Podman machine',
      kubernetesProviderConnectionInitialization: false,
      cleanupSupport: false,
    },
    {
      id: 'foobar3',
      name: 'foobar3',
      extensionId: 'podman-desktop.foobar3',
      images: {
        icon: 'img',
      },
      status: 'unknown',
      warnings: [],
      containerProviderConnectionCreation: true,
      detectionChecks: [],
      containerConnections: [
        {
          name: 'machine',
          status: 'started',
          endpoint: {
            socketPath: 'socket',
          },
          lifecycleMethods: ['start', 'stop', 'delete'],
          type: 'podman',
        },
      ],
      installationSupport: false,
      internalId: '0',
      kubernetesConnections: [],
      kubernetesProviderConnectionCreation: true,
      links: [],
      containerProviderConnectionInitialization: false,
      containerProviderConnectionCreationDisplayName: 'Podman machine',
      kubernetesProviderConnectionInitialization: false,
      cleanupSupport: false,
    },
    {
      id: 'foobar4',
      name: 'foobar4',
      extensionId: 'podman-desktop.foobar4',
      images: {
        icon: 'img',
      },
      status: 'installed',
      warnings: [],
      containerProviderConnectionCreation: true,
      detectionChecks: [],
      containerConnections: [
        {
          name: 'machine',
          status: 'started',
          endpoint: {
            socketPath: 'socket',
          },
          lifecycleMethods: ['start', 'stop', 'delete'],
          type: 'podman',
        },
      ],
      installationSupport: false,
      internalId: '0',
      kubernetesConnections: [],
      kubernetesProviderConnectionCreation: true,
      links: [],
      containerProviderConnectionInitialization: false,
      containerProviderConnectionCreationDisplayName: 'Podman machine',
      kubernetesProviderConnectionInitialization: false,
      cleanupSupport: false,
    },
    {
      id: 'foobar5',
      name: 'foobar5',
      extensionId: 'podman-desktop.foobar4',
      images: {
        icon: 'img',
      },
      status: 'installed',
      warnings: [],
      containerProviderConnectionCreation: true,
      detectionChecks: [],
      containerConnections: [
        {
          name: 'machine',
          status: 'started',
          endpoint: {
            socketPath: 'socket',
          },
          lifecycleMethods: ['start', 'stop', 'delete'],
          type: 'podman',
        },
      ],
      installationSupport: false,
      internalId: '0',
      kubernetesConnections: [],
      kubernetesProviderConnectionCreation: true,
      links: [],
      containerProviderConnectionInitialization: false,
      containerProviderConnectionCreationDisplayName: 'Podman machine',
      kubernetesProviderConnectionInitialization: false,
      cleanupSupport: false,
    },
  ]);

  onboardingList.set([
    {
      extension: 'podman-desktop.foobar1',
      title: 'onboarding',
      name: 'foobar1',
      displayName: 'FooBar1',
      icon: 'data:image/png;base64,foobar1',
      steps: [
        {
          id: 'step',
          title: 'step',
          state: 'failed',
          completionEvents: [],
        },
      ],
      enablement: 'true',
    },
    {
      extension: 'podman-desktop.foobar2',
      title: 'onboarding',
      name: 'foobar2',
      displayName: 'FooBar2',
      icon: 'data:image/png;base64,foobar2',
      steps: [
        {
          id: 'step',
          title: 'step',
          state: 'failed',
          completionEvents: [],
        },
      ],
      enablement: 'true',
    },
    {
      extension: 'podman-desktop.foobar3',
      title: 'onboarding',
      name: 'foobar3',
      displayName: 'FooBar3',
      icon: 'data:image/png;base64,foobar3',
      steps: [
        {
          id: 'step',
          title: 'step',
          state: 'failed',
          completionEvents: [],
        },
      ],
      enablement: 'true',
    },
    {
      extension: 'podman-desktop.foobar4',
      title: 'onboarding',
      name: 'foobar4',
      displayName: 'FooBar4',
      icon: 'data:image/png;base64,foobar4',
      steps: [
        {
          id: 'step',
          title: 'step',
          state: 'failed',
          completionEvents: [],
        },
      ],
      enablement: 'false',
    },
  ]);

  // wait until the onboarding list is populated
  while (get(onboardingList).length === 0) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  await waitRender({ showWelcome: true });

  // wait until aria-label 'providerList' is populated
  while (screen.queryAllByLabelText('providerList').length === 0) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Expect FooBar1 to be unchecked since the provider is 'pending', even if enablement is true
  const checkbox1 = screen.getByRole('checkbox', { name: 'FooBar1 checkbox' });
  expect(checkbox1).toBeInTheDocument();
  expect(checkbox1).not.toBeChecked();

  // Expect FooBar2 to be checked since the provider is 'not-installed' and enablement is true
  const checkbox2 = screen.getByRole('checkbox', { name: 'FooBar2 checkbox' });
  expect(checkbox2).toBeInTheDocument();
  expect(checkbox2).toBeChecked();

  // Expect FooBar3 to be checked since the provider is 'unknown' and enablement is true
  const checkbox3 = screen.getByRole('checkbox', { name: 'FooBar3 checkbox' });
  expect(checkbox3).toBeInTheDocument();
  expect(checkbox3).toBeChecked();

  // Expect FooBar4 to be unchecked since the provider is 'installed' and enablement is false
  const checkbox4 = screen.getByRole('checkbox', { name: 'FooBar4 checkbox' });
  expect(checkbox4).toBeInTheDocument();
  expect(checkbox4).not.toBeChecked();

  // Expect FooBar5 to NOT show up since it's not in the onboarding list even if it's part of the provider list
  const checkbox5 = screen.queryByRole('checkbox', { name: 'FooBar5 checkbox' });
  expect(checkbox5).not.toBeInTheDocument();
});
