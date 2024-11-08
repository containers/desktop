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

import { withConfirmation } from '../dialogs/messagebox-utils';

export function withBulkConfirmation(callback: () => unknown, text: string): void {
  window
    .getConfigurationValue('userConfirmation.bulk')
    .then(confirm => (confirm ? withConfirmation(callback, text) : callback()))
    .catch((err: unknown) => console.error('Error getting configuration value userConfirmation.bulk', err));
}
