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

import '@testing-library/jest-dom';
import { test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import DetailsPage from './DetailsPage.svelte';
import { lastPage, currentPage } from '../../stores/breadcrumb';
import type { TinroBreadcrumb } from 'tinro';

test('Expect title is defined', async () => {
  const title = 'My Dummy Title';
  render(DetailsPage, {
    title,
  });

  const titleElement = screen.getByRole('heading', { level: 1, name: title });
  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toHaveTextContent(title);
});

test('Expect name is defined', async () => {
  const name = 'My Dummy Name';
  currentPage.set({ name: name, path: '/' } as TinroBreadcrumb);
  render(DetailsPage, {
    title: 'No Title',
  });

  const nameElement = screen.getByLabelText('name');
  expect(nameElement).toBeInTheDocument();
  expect(nameElement).toHaveTextContent(name);
});

test('Expect backlink is defined', async () => {
  const backName = 'Last page';
  const backPath = '/back';
  lastPage.set({ name: backName, path: backPath } as TinroBreadcrumb);
  render(DetailsPage, {
    title: 'No Title',
  });

  const backElement = screen.getByLabelText('back');
  expect(backElement).toBeInTheDocument();
  expect(backElement).toHaveTextContent(backName);

  const urlMock = vi.fn();
  (window as any).openExternal = urlMock;

  fireEvent.click(backElement);

  expect(urlMock).toBeCalledWith('/back');
});

test('Expect close link is defined', async () => {
  const backPath = '/back';
  lastPage.set({ name: 'Back', path: backPath } as TinroBreadcrumb);
  render(DetailsPage, {
    title: 'No Title',
  });

  const closeElement = screen.getByTitle('Close Details');
  expect(closeElement).toBeInTheDocument();
  expect(closeElement).toHaveAttribute('href', backPath);
});
