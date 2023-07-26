/**********************************************************************
 * Copyright (C) 2022 Red Hat, Inc.
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

import type {
  ProviderContainerConnectionInfo,
  ProviderInfo,
  ProviderKubernetesConnectionInfo,
} from '../../../../main/src/plugin/api/provider-info';
import type { IConfigurationPropertyRecordedSchema } from '../../../../main/src/plugin/configuration-registry';

export interface IProviderConnectionConfigurationPropertyRecorded extends IConfigurationPropertyRecordedSchema {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  connection: string;
  providerId: string;
}

export interface IConnectionStatus {
  status: string;
  action?: string;
  inProgress: boolean;
  error?: string;
}

export interface IConnectionRestart {
  provider: string;
  container: string;
  loggerHandlerKey: symbol;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function writeToTerminal(xterm: any, data: any[], colorPrefix: string): void {
  if (Array.isArray(data)) {
    writeArrayToTerminal(xterm, data, colorPrefix);
  } else if (typeof data === 'string') {
    writeMultilineString(xterm, data, colorPrefix);
  }
}

function writeArrayToTerminal(xterm: any, data: any[], colorPrefix: string) {
  for (const content of data) {
    if (Array.isArray(content)) {
      writeArrayToTerminal(xterm, content, colorPrefix);
    } else if (typeof content === 'string') {
      writeMultilineString(xterm, content, colorPrefix);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function writeMultilineString(xterm: any, data: string, colorPrefix: string): void {
  if (data?.includes?.('\n')) {
    const toWrite = data.split('\n');
    for (const s of toWrite) {
      xterm.write(colorPrefix + s + '\n\r');
    }
  } else {
    xterm.write(colorPrefix + data + '\r');
  }
}

export function getProviderConnectionName(
  provider: ProviderInfo,
  providerConnectionInfo: ProviderContainerConnectionInfo | ProviderKubernetesConnectionInfo,
): string {
  return `${provider.name}-${providerConnectionInfo.name}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNormalizedDefaultNumberValue(configurationKey: IConfigurationPropertyRecordedSchema): any {
  if (!configurationKey.maximum || typeof configurationKey.maximum !== 'number') {
    return configurationKey.default;
  }
  if (configurationKey.maximum > configurationKey.default) {
    return configurationKey.default;
  }
  return configurationKey.maximum;
}
