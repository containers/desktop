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
import { beforeAll, expect, test } from 'vitest';
import ProviderCard from './ProviderCard.svelte';
import { screen, render } from '@testing-library/svelte';
import type { ProviderInfo } from '../../../../main/src/plugin/api/provider-info';
import type { ProviderImages } from '@podman-desktop/api';

test('Expect provider region', async () => {
  const provider: ProviderInfo = {
    internalId: 'internal-id',
    id: 'my-provider',
    extensionId: '',
    name: 'Podman',
    containerConnections: [],
    kubernetesConnections: [],
    status: 'not-installed',
    containerProviderConnectionCreation: false,
    containerProviderConnectionInitialization: false,
    kubernetesProviderConnectionCreation: false,
    kubernetesProviderConnectionInitialization: false,
    links: [],
    detectionChecks: [],
    warnings: [],
    images: {} as ProviderImages,
    installationSupport: false,
  };
  render(ProviderCard, { provider });

  const region = screen.getByRole('region', { name: provider.name + ' Provider' });
  expect(region).toBeInTheDocument();
});

test('Expect provider name', async () => {
  const provider: ProviderInfo = {
    internalId: 'internal-id',
    id: 'my-provider',
    extensionId: '',
    name: 'Podman',
    containerConnections: [],
    kubernetesConnections: [],
    status: 'not-installed',
    containerProviderConnectionCreation: false,
    containerProviderConnectionInitialization: false,
    kubernetesProviderConnectionCreation: false,
    kubernetesProviderConnectionInitialization: false,
    links: [],
    detectionChecks: [],
    warnings: [],
    images: {} as ProviderImages,
    installationSupport: false,
  };
  render(ProviderCard, { provider });

  const name = screen.getByLabelText('context-name');
  expect(name).toBeInTheDocument();
  expect(name.textContent).toContain(provider.name);
});

test('Expect no provider version', async () => {
  const provider: ProviderInfo = {
    internalId: 'internal-id',
    id: 'my-provider',
    extensionId: '',
    name: 'Podman',
    containerConnections: [],
    kubernetesConnections: [],
    status: 'not-installed',
    containerProviderConnectionCreation: false,
    containerProviderConnectionInitialization: false,
    kubernetesProviderConnectionCreation: false,
    kubernetesProviderConnectionInitialization: false,
    links: [],
    detectionChecks: [],
    warnings: [],
    images: {} as ProviderImages,
    installationSupport: false,
    // no version
  };
  render(ProviderCard, { provider });

  const version = screen.queryByLabelText('Provider Version');
  expect(version).not.toBeInTheDocument();
});

test('Expect provider version', async () => {
  const provider: ProviderInfo = {
    internalId: 'internal-id',
    id: 'my-provider',
    extensionId: '',
    name: 'Podman',
    containerConnections: [],
    kubernetesConnections: [],
    status: 'not-installed',
    containerProviderConnectionCreation: false,
    containerProviderConnectionInitialization: false,
    kubernetesProviderConnectionCreation: false,
    kubernetesProviderConnectionInitialization: false,
    links: [],
    detectionChecks: [],
    warnings: [],
    images: {} as ProviderImages,
    installationSupport: false,
    version: '1.2.3',
  };
  render(ProviderCard, { provider });

  const version = screen.getByLabelText('Provider Version');
  expect(version).toBeInTheDocument();
  expect(version.textContent).toBe('v' + provider.version);
});

test('Expect provider state', async () => {
  const provider: ProviderInfo = {
    internalId: 'internal-id',
    id: 'my-provider',
    extensionId: '',
    name: 'Podman',
    containerConnections: [],
    kubernetesConnections: [],
    status: 'not-installed',
    containerProviderConnectionCreation: false,
    containerProviderConnectionInitialization: false,
    kubernetesProviderConnectionCreation: false,
    kubernetesProviderConnectionInitialization: false,
    links: [],
    detectionChecks: [],
    warnings: [],
    images: {} as ProviderImages,
    installationSupport: false,
  };
  render(ProviderCard, { provider });

  const state = screen.getByLabelText('Actual State');
  expect(state).toBeInTheDocument();
  expect(state.textContent).toContain('NOT-INSTALLED');
});
