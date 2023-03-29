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

import { beforeEach, expect, test, vi } from 'vitest';
import type { Mock } from 'vitest';
import { ImageHandler } from './image-handler';
import * as extensionApi from '@podman-desktop/api';
import * as fs from 'node:fs';

let imageHandler: ImageHandler;
vi.mock('@podman-desktop/api', async () => {
  return {
    containerEngine: {
      saveImage: vi.fn(),
    },
    window: {
      showNotification: vi.fn(),
    },
  };
});

vi.mock('./util', async () => {
  return {
    runCliCommand: vi.fn().mockReturnValue({ exitCode: 0 }),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
  imageHandler = new ImageHandler();
});

test('expect error to be raised if no image is given', async () => {
  try {
    await imageHandler.moveImage({ engineId: 'dummy' }, [], undefined);
  } catch (err) {
    expect(err).to.be.a('Error');
    expect(err.message).equal('Image selection not supported yet');
  }
});

test('expect error to be raised if no clusters are given', async () => {
  try {
    await imageHandler.moveImage({ engineId: 'dummy', name: 'myimage' }, [], undefined);
  } catch (err) {
    expect(err).to.be.a('Error');
    expect(err.message).equal('No Kind clusters to push to');
  }
});

test('expect image name to be given', async () => {
  (extensionApi.containerEngine.saveImage as Mock).mockImplementation(
    (engineId: string, id: string, filename: string) => fs.promises.open(filename, 'w'),
  );

  await imageHandler.moveImage(
    { engineId: 'dummy', name: 'myimage' },
    [{ name: 'c1', engineType: 'podman', status: 'started', apiPort: 9443 }],
    undefined,
  );
  expect(extensionApi.containerEngine.saveImage).toBeCalledWith('dummy', 'myimage', expect.anything());
});

test('expect image name and tag to be given', async () => {
  (extensionApi.containerEngine.saveImage as Mock).mockImplementation(
    (engineId: string, id: string, filename: string) => fs.promises.open(filename, 'w'),
  );

  await imageHandler.moveImage(
    { engineId: 'dummy', name: 'myimage', tag: '1.0' },
    [{ name: 'c1', engineType: 'podman', status: 'started', apiPort: 9443 }],
    undefined,
  );
  expect(extensionApi.containerEngine.saveImage).toBeCalledWith('dummy', 'myimage:1.0', expect.anything());
});
