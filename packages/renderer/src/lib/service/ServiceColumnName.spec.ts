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

import '@testing-library/jest-dom/vitest';

import { fireEvent } from '@testing-library/dom';
import { render, screen } from '@testing-library/svelte';
import { router } from 'tinro';
import { expect, test, vi } from 'vitest';

import ServiceColumnName from './ServiceColumnName.svelte';
import type { ServiceUI } from './ServiceUI';

const service: ServiceUI = {
  name: 'my-service',
  status: 'RUNNING',
  namespace: 'default',
  selected: false,
  type: '',
  clusterIP: '',
  ports: '',
};

test('Expect simple column styling', async () => {
  render(ServiceColumnName, { object: JSON.parse(JSON.stringify(service)) });

  const text = screen.getByText(service.name);
  expect(text).toBeInTheDocument();
  expect(text).toHaveClass('text-[var(--pd-table-body-text-highlight)]');
});

test('Expect clicking works', async () => {
  render(ServiceColumnName, { object: JSON.parse(JSON.stringify(service)) });

  const text = screen.getByText(service.name);
  expect(text).toBeInTheDocument();

  // test click
  const routerGotoSpy = vi.spyOn(router, 'goto');

  fireEvent.click(text);

  expect(routerGotoSpy).toBeCalledWith('/kubernetes/services/my-service/default/summary');
});

test('If loadBalancerIPs is set, expect it to be displayed', async () => {
  service.loadBalancerIPs = '10.0.0.1';
  render(ServiceColumnName, { object: JSON.parse(JSON.stringify(service)) });

  const text = screen.getByText(service.name);
  expect(text).toBeInTheDocument();

  const loadBalancerIPs = screen.getByText(service.loadBalancerIPs);
  expect(loadBalancerIPs).toBeInTheDocument();
});

test('Expect to show namespace in column', async () => {
  render(ServiceColumnName, { object: JSON.parse(JSON.stringify(service)) });

  const text = screen.getByText(service.namespace);
  expect(text).toBeInTheDocument();
});
