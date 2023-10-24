/**********************************************************************
 * Copyright (C) 2023 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

/* eslint-disable @typescript-eslint/no-explicit-any */

import '@testing-library/jest-dom/vitest';
import { within } from '@testing-library/dom';
import { afterEach, beforeAll, expect, suite, test, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { cliToolInfos } from '/@/stores/cli-tools';
import type { CliToolInfo } from '../../../../main/src/plugin/api/cli-tool-info';
import PreferencesCliToolsRendering from './PreferencesCliToolsRendering.svelte';

afterEach(() => {
  vi.clearAllMocks();
});

const cliToolInfoItem1: CliToolInfo = {
  id: 'ext-id.tool-name1',
  name: 'tool-name1',
  description: 'markdown description1',
  displayName: 'tools-display-name1',
  state: 'registered',
  extensionInfo: {
    id: 'ext-id1',
    label: 'ext-label1',
  },
};

const cliToolInfoItem2: CliToolInfo = {
  id: 'ext-id.tool-name2',
  name: 'tool-name2',
  description: 'markdown description2',
  displayName: 'tools-display-name2',
  state: 'registered',
  extensionInfo: {
    id: 'ext-id2',
    label: 'ext-label2',
  },
  images: {},
};

const cliToolInfoItem3: CliToolInfo = {
  id: 'ext-id.tool-name2',
  name: 'tool-name2',
  description: 'markdown description2',
  displayName: 'tools-display-name2',
  state: 'registered',
  extensionInfo: {
    id: 'ext-id2',
    label: 'ext-label2',
  },
  images: {
    icon: 'encoded-icon',
  },
};

suite('CLI Tool Prefernces page shows', () => {
  const cliTools = [cliToolInfoItem1, cliToolInfoItem2, cliToolInfoItem3];
  let cliToolRows: HTMLElement[] = [];

  beforeAll(() => {
    cliToolInfos.set(cliTools);
    render(PreferencesCliToolsRendering, {});
    const cliToolsTable = screen.getByRole('table', { name: 'cli-tools' });
    cliToolRows = within(cliToolsTable).getAllByRole('row');
  });

  test('all registered tools', () => {
    expect(cliToolRows.length).equals(cliTools.length);
  });
});
