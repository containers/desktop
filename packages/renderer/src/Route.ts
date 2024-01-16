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

import { Page } from '../../main/src/plugin/routes';
import { router } from 'tinro';

/**
 * Navigation hints for setting current page and history (breadcrumbs):
 *  root    - root pages that reset the history
 *  details - additional pages that should be tracked in the history
 *  tab     - tabs or other sub-pages that affect the URL, but do not
 *            change what the 'current' page is.
 */
export type NavigationHint = 'root' | 'details' | 'tab';

export const navigationHandle = (page: Page, parameters?: Record<string, string>) => {
  switch (page) {
    case Page.CONTAINERS:
      router.goto('/containers');
      break;
    case Page.CONTAINER:
      parameters && router.goto(`/containers/${parameters['id']}/`);
      break;
    case Page.CONTAINER_LOGS:
      parameters && router.goto(`/containers/${parameters['id']}/logs`);
      break;
    case Page.CONTAINER_INSPECT:
      parameters && router.goto(`/containers/${parameters['id']}/inspect`);
      break;
    case Page.CONTAINER_TERMINAL:
      parameters && router.goto(`/containers/${parameters['id']}/terminal`);
      break;
    case Page.IMAGES:
      router.goto(`/images`);
      break;
    case Page.IMAGE:
      if (parameters) {
        const tagBase64 = Buffer.from(parameters['tag']).toString('base64');
        router.goto(`/images/${parameters['id']}/${parameters['engineId']}/${tagBase64}`);
      }
      break;
    case Page.PODS:
      router.goto(`/pods`);
      break;
    case Page.POD:
      parameters && router.goto(`/pods/${parameters['kind']}/${parameters['name']}/${parameters['engineId']}/`);
      break;
    case Page.VOLUMES:
      router.goto('/volumes');
      break;
    case Page.VOLUME:
      parameters && router.goto(`/volumes/${parameters['name']}/`);
      break;
    case Page.CONTRIBUTION:
      parameters && router.goto(`/contribs/${parameters['name']}/`);
      break;
    case Page.TROUBLESHOOTING:
      router.goto('/troubleshooting/repair-connections');
      break;
    case Page.HELP:
      router.goto('/help');
      break;
  }
};
