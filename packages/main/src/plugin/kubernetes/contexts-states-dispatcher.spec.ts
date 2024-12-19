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

import { expect, test, vi } from 'vitest';

import type { KubernetesResourceName } from '/@api/kubernetes-resources.js';

import type { ApiSenderType } from '../api.js';
import type { ContextHealthState } from './context-health-checker.js';
import type { ContextResourcePermission } from './context-permissions-checker.js';
import type { ContextsManagerExperimental } from './contexts-manager-experimental.js';
import { ContextsStatesDispatcher } from './contexts-states-dispatcher.js';
import type { KubeConfigSingleContext } from './kubeconfig-single-context.js';

test('ContextsStatesDispatcher should call updateHealthStates when onContextHealthStateChange event is fired', () => {
  const onContextHealthStateChangeMock = vi.fn();
  const onContextPermissionResultMock = vi.fn();
  const manager: ContextsManagerExperimental = {
    onContextHealthStateChange: onContextHealthStateChangeMock,
    onContextPermissionResult: onContextPermissionResultMock,
    onContextDelete: vi.fn(),
    getHealthCheckersStates: vi.fn(),
    getPermissions: vi.fn(),
  } as unknown as ContextsManagerExperimental;
  const apiSender: ApiSenderType = {
    send: vi.fn(),
  } as unknown as ApiSenderType;
  const dispatcher = new ContextsStatesDispatcher(manager, apiSender);
  const updateHealthStatesSpy = vi.spyOn(dispatcher, 'updateHealthStates');
  const updatePermissionsSpy = vi.spyOn(dispatcher, 'updatePermissions');
  dispatcher.init();
  expect(updateHealthStatesSpy).not.toHaveBeenCalled();
  expect(updatePermissionsSpy).not.toHaveBeenCalled();

  onContextHealthStateChangeMock.mockImplementation(f => f());
  vi.mocked(manager.getHealthCheckersStates).mockReturnValue(new Map<string, ContextHealthState>());
  dispatcher.init();
  expect(updateHealthStatesSpy).toHaveBeenCalled();
  expect(updatePermissionsSpy).not.toHaveBeenCalled();
});

test('ContextsStatesDispatcher should call updatePermissions when onContextPermissionResult event is fired', () => {
  const onContextHealthStateChangeMock = vi.fn();
  const onContextPermissionResultMock = vi.fn();
  const manager: ContextsManagerExperimental = {
    onContextHealthStateChange: onContextHealthStateChangeMock,
    onContextPermissionResult: onContextPermissionResultMock,
    onContextDelete: vi.fn(),
    getHealthCheckersStates: vi.fn(),
    getPermissions: vi.fn(),
  } as unknown as ContextsManagerExperimental;
  const apiSender: ApiSenderType = {
    send: vi.fn(),
  } as unknown as ApiSenderType;
  vi.mocked(manager.getPermissions).mockReturnValue(
    new Map<string, Map<KubernetesResourceName, ContextResourcePermission>>(),
  );
  const dispatcher = new ContextsStatesDispatcher(manager, apiSender);
  const updateHealthStatesSpy = vi.spyOn(dispatcher, 'updateHealthStates');
  const updatePermissionsSpy = vi.spyOn(dispatcher, 'updatePermissions');
  dispatcher.init();
  expect(updateHealthStatesSpy).not.toHaveBeenCalled();
  expect(updatePermissionsSpy).not.toHaveBeenCalled();

  onContextPermissionResultMock.mockImplementation(f => f());
  dispatcher.init();
  expect(updateHealthStatesSpy).not.toHaveBeenCalled();
  expect(updatePermissionsSpy).toHaveBeenCalled();
});

test('ContextsStatesDispatcher should call updateHealthStates and updatePermissions when onContextDelete event is fired', () => {
  const onContextDeleteMock = vi.fn();
  const manager: ContextsManagerExperimental = {
    onContextHealthStateChange: vi.fn(),
    onContextPermissionResult: vi.fn(),
    onContextDelete: onContextDeleteMock,
    getHealthCheckersStates: vi.fn(),
    getPermissions: vi.fn(),
  } as unknown as ContextsManagerExperimental;
  const apiSender: ApiSenderType = {
    send: vi.fn(),
  } as unknown as ApiSenderType;
  vi.mocked(manager.getPermissions).mockReturnValue(
    new Map<string, Map<KubernetesResourceName, ContextResourcePermission>>(),
  );
  const dispatcher = new ContextsStatesDispatcher(manager, apiSender);
  const updateHealthStatesSpy = vi.spyOn(dispatcher, 'updateHealthStates');
  const updatePermissionsSpy = vi.spyOn(dispatcher, 'updatePermissions');
  vi.mocked(manager.getHealthCheckersStates).mockReturnValue(new Map<string, ContextHealthState>());
  dispatcher.init();
  expect(updateHealthStatesSpy).not.toHaveBeenCalled();
  expect(updatePermissionsSpy).not.toHaveBeenCalled();

  onContextDeleteMock.mockImplementation(f => f());
  dispatcher.init();
  expect(updateHealthStatesSpy).toHaveBeenCalled();
  expect(updatePermissionsSpy).toHaveBeenCalled();
});

test('getContextsHealths should return the values of the map returned by manager.getHealthCheckersStates without kubeConfig', () => {
  const manager: ContextsManagerExperimental = {
    onContextHealthStateChange: vi.fn(),
    onContextPermissionResult: vi.fn(),
    onContextDelete: vi.fn(),
    getHealthCheckersStates: vi.fn(),
    getPermissions: vi.fn(),
  } as unknown as ContextsManagerExperimental;
  const sendMock = vi.fn();
  const apiSender: ApiSenderType = {
    send: sendMock,
  } as unknown as ApiSenderType;
  const dispatcher = new ContextsStatesDispatcher(manager, apiSender);
  const context1State = {
    contextName: 'context1',
    checking: true,
    reachable: false,
  };
  const context2State = {
    contextName: 'context2',
    checking: false,
    reachable: true,
  };
  const value = new Map<string, ContextHealthState>([
    ['context1', { ...context1State, kubeConfig: {} as unknown as KubeConfigSingleContext }],
    ['context2', { ...context2State, kubeConfig: {} as unknown as KubeConfigSingleContext }],
  ]);
  vi.mocked(manager.getHealthCheckersStates).mockReturnValue(value);
  const result = dispatcher.getContextsHealths();
  expect(result).toEqual([context1State, context2State]);
});

test('updateHealthStates should call apiSender.send with kubernetes-contexts-healths', () => {
  const manager: ContextsManagerExperimental = {
    onContextHealthStateChange: vi.fn(),
    onContextPermissionResult: vi.fn(),
    onContextDelete: vi.fn(),
    getHealthCheckersStates: vi.fn(),
    getPermissions: vi.fn(),
  } as unknown as ContextsManagerExperimental;
  const sendMock = vi.fn();
  const apiSender: ApiSenderType = {
    send: sendMock,
  } as unknown as ApiSenderType;
  const dispatcher = new ContextsStatesDispatcher(manager, apiSender);
  vi.spyOn(dispatcher, 'getContextsHealths').mockReturnValue([]);
  dispatcher.updateHealthStates();
  expect(sendMock).toHaveBeenCalledWith('kubernetes-contexts-healths');
});

test('getContextsPermissions should return the values as an array', () => {
  const manager: ContextsManagerExperimental = {
    getPermissions: vi.fn(),
  } as unknown as ContextsManagerExperimental;
  const apiSender: ApiSenderType = {
    send: vi.fn(),
  } as unknown as ApiSenderType;
  const dispatcher = new ContextsStatesDispatcher(manager, apiSender);
  const value = new Map<string, Map<KubernetesResourceName, ContextResourcePermission>>([
    [
      'context1',
      new Map<KubernetesResourceName, ContextResourcePermission>([
        [
          'pods',
          {
            attrs: {},
            permitted: true,
            reason: 'ok',
          },
        ],
        [
          'deployments',
          {
            attrs: {},
            permitted: false,
            reason: 'nok',
          },
        ],
      ]),
    ],
    [
      'context2',
      new Map<KubernetesResourceName, ContextResourcePermission>([
        [
          'pods',
          {
            attrs: {},
            permitted: false,
            reason: 'nok',
          },
        ],
        [
          'deployments',
          {
            attrs: {},
            permitted: true,
            reason: 'ok',
          },
        ],
      ]),
    ],
  ]);
  vi.mocked(manager.getPermissions).mockReturnValue(value);
  const result = dispatcher.getContextsPermissions();
  expect(result).toEqual([
    {
      contextName: 'context1',
      resourceName: 'pods',
      permitted: true,
      reason: 'ok',
    },
    {
      contextName: 'context1',
      resourceName: 'deployments',
      permitted: false,
      reason: 'nok',
    },
    {
      contextName: 'context2',
      resourceName: 'pods',
      permitted: false,
      reason: 'nok',
    },
    {
      contextName: 'context2',
      resourceName: 'deployments',
      permitted: true,
      reason: 'ok',
    },
  ]);
});

test('updatePermissions should call apiSender.send with kubernetes-contexts-permissions', () => {
  const manager: ContextsManagerExperimental = {
    onContextHealthStateChange: vi.fn(),
    onContextPermissionResult: vi.fn(),
    onContextDelete: vi.fn(),
    getHealthCheckersStates: vi.fn(),
    getPermissions: vi.fn(),
  } as unknown as ContextsManagerExperimental;
  const apiSender: ApiSenderType = {
    send: vi.fn(),
  } as unknown as ApiSenderType;
  const dispatcher = new ContextsStatesDispatcher(manager, apiSender);
  vi.spyOn(dispatcher, 'getContextsPermissions').mockReturnValue([]);
  dispatcher.updatePermissions();
  expect(vi.mocked(apiSender.send)).toHaveBeenCalledWith('kubernetes-contexts-permissions');
});
