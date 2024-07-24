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

import KubeIcon from '/@/lib/images/KubeIcon.svelte';

import { kubernetesContexts } from '../kubernetes-contexts';
import { createNavigationKubernetesConfigMapSecretsEntry } from './kubernetes/navigation-registry-k8s-configmap-secrets.svelte';
import { createNavigationKubernetesDeploymentsEntry } from './kubernetes/navigation-registry-k8s-deployments.svelte';
import { createNavigationKubernetesIngressesRoutesEntry } from './kubernetes/navigation-registry-k8s-ingresses-routes.svelte';
import { createNavigationKubernetesNodesEntry } from './kubernetes/navigation-registry-k8s-nodes.svelte';
import { createNavigationKubernetesPersistentVolumeEntry } from './kubernetes/navigation-registry-k8s-persistent-volume.svelte';
import { createNavigationKubernetesServicesEntry } from './kubernetes/navigation-registry-k8s-services.svelte';
import type { NavigationRegistryEntry } from './navigation-registry';

let kubernetesNavigationGroupItems: NavigationRegistryEntry[] = $state([]);

// default is false until we receive the kubernetes contexts
let enabled = $state(false);

kubernetesContexts.subscribe(value => {
  enabled = value.length > 0;
});

export function createNavigationKubernetesGroup(): NavigationRegistryEntry {
  const newItems: NavigationRegistryEntry[] = [];
  newItems.push(createNavigationKubernetesNodesEntry());
  newItems.push(createNavigationKubernetesDeploymentsEntry());
  newItems.push(createNavigationKubernetesServicesEntry());
  newItems.push(createNavigationKubernetesIngressesRoutesEntry());
  newItems.push(createNavigationKubernetesPersistentVolumeEntry());
  newItems.push(createNavigationKubernetesConfigMapSecretsEntry());
  kubernetesNavigationGroupItems = newItems;

  const mainGroupEntry: NavigationRegistryEntry = {
    name: 'Kubernetes',
    icon: { iconComponent: KubeIcon },
    link: ``,
    tooltip: '',
    type: 'section',
    get counter() {
      return 0;
    },
    get enabled() {
      return enabled;
    },
    get items() {
      return kubernetesNavigationGroupItems;
    },
  };

  return mainGroupEntry;
}
