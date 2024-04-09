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

import type { IConfigurationNode, IConfigurationRegistry } from '../configuration-registry.js';
import { LibpodapiSettings } from './libpodapi-settings.js';

export class LibpodapiInit {
  constructor(private configurationRegistry: IConfigurationRegistry) {}

  init(): void {
    const libpodapiPlatformConfiguration: IConfigurationNode = {
      id: `preferences.${LibpodapiSettings.SectionName}`,
      title: 'Libpodapi',
      type: 'object',
      properties: {
        [`${LibpodapiSettings.SectionName}.${LibpodapiSettings.Enable}`]: {
          description: 'Enable using libpodapi for API calls instead of compat API.',
          type: 'boolean',
          default: true,
          hidden: true,
        },
      },
    };

    this.configurationRegistry.registerConfigurations([libpodapiPlatformConfiguration]);
  }
}
