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

import * as extensionApi from '@podman-desktop/api';
import { detectKind } from './util';
import { KindInstaller } from './kind-installer';
import type { Logger } from '@podman-desktop/api';
import { window } from '@podman-desktop/api';
import { ImageHandler } from './image-handler';
import { createCluster } from './create-cluster';

const API_KIND_INTERNAL_API_PORT = 6443;

const KIND_INSTALL_COMMAND = 'kind.install';

const KIND_MOVE_IMAGE_COMMAND = 'kind.image.move';

export interface KindCluster {
  name: string;
  status: extensionApi.ProviderConnectionStatus;
  apiPort: number;
  engineType: 'podman' | 'docker';
}

let kindClusters: KindCluster[] = [];
const registeredKubernetesConnections: {
  connection: extensionApi.KubernetesProviderConnection;
  disposable: extensionApi.Disposable;
}[] = [];

let kindCli: string | undefined;

const imageHandler = new ImageHandler();

function registerProvider(extensionContext: extensionApi.ExtensionContext, provider: extensionApi.Provider): void {
  const disposable = provider.setKubernetesProviderConnectionFactory({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    create: (params: { [key: string]: any }, logger?: Logger) => createCluster(params, logger, kindCli),
    creationDisplayName: 'Kind cluster',
  });
  extensionContext.subscriptions.push(disposable);
  console.log('kind extension is active');
}

// search for clusters
async function updateClusters(provider: extensionApi.Provider, containers: extensionApi.ContainerInfo[]) {
  kindClusters = containers.map(container => {
    const clusterName = container.Labels['io.x-k8s.kind.cluster'];
    const clusterStatus = container.State;

    // search the port where the cluster is listening
    const listeningPort = container.Ports.find(
      port => port.PrivatePort === API_KIND_INTERNAL_API_PORT && port.Type === 'tcp',
    );
    let status: extensionApi.ProviderConnectionStatus;
    if (clusterStatus === 'running') {
      status = 'started';
    } else {
      status = 'stopped';
    }

    return {
      name: clusterName,
      status,
      apiPort: listeningPort?.PublicPort || 0,
      engineType: container.engineType,
    };
  });

  kindClusters.forEach(cluster => {
    const item = registeredKubernetesConnections.find(item => item.connection.name === cluster.name);
    const status = () => {
      return cluster.status;
    };
    if (!item) {
      // create a new connection
      const connection: extensionApi.KubernetesProviderConnection = {
        id: 'kubernetes',
        name: cluster.name,
        status,
        endpoint: {
          apiURL: `https://localhost:${cluster.apiPort}`,
        },
      };
      const disposable = provider.registerKubernetesProviderConnection(connection);

      registeredKubernetesConnections.push({ connection, disposable });
    } else {
      item.connection.status = status;
      item.connection.endpoint.apiURL = `https://localhost:${cluster.apiPort}`;
    }
  });

  // do we have registeredKubernetesConnections that are not in kindClusters?
  registeredKubernetesConnections.forEach(item => {
    const cluster = kindClusters.find(cluster => cluster.name === item.connection.name);
    if (!cluster) {
      // remove the connection
      item.disposable.dispose();
    }
  });
}

async function searchKindClusters(provider: extensionApi.Provider) {
  const allContainers = await extensionApi.containerEngine.listContainers();

  // search all containers with io.x-k8s.kind.cluster label
  const kindContainers = allContainers.filter(container => {
    return container.Labels?.['io.x-k8s.kind.cluster'];
  });

  updateClusters(provider, kindContainers);
}

function createProvider(extensionContext: extensionApi.ExtensionContext) {
  const provider = extensionApi.provider.createProvider({
    name: 'Kind',
    id: 'kind',
    status: 'unknown',
    images: {
      icon: './icon.png',
      logo: {
        dark: './logo-dark.png',
        light: './logo-light.png',
      },
    },
  });
  extensionContext.subscriptions.push(provider);
  registerProvider(extensionContext, provider);
  extensionContext.subscriptions.push(
    extensionApi.commands.registerCommand(KIND_MOVE_IMAGE_COMMAND, image =>
      imageHandler.moveImage(image, kindClusters, kindCli),
    ),
  );

  // when containers are refreshed, update
  extensionApi.containerEngine.onEvent(async event => {
    if (event.Type === 'container') {
      // needs to search for kind clusters
      searchKindClusters(provider);
    }
  });

  // search when a new container is updated or removed
  extensionApi.provider.onDidRegisterContainerConnection(() => {
    searchKindClusters(provider);
  });
  extensionApi.provider.onDidUnregisterContainerConnection(() => {
    searchKindClusters(provider);
  });
  extensionApi.provider.onDidUpdateProvider(() => registerProvider(extensionContext, provider));
}

export async function activate(extensionContext: extensionApi.ExtensionContext): Promise<void> {
  const installer = new KindInstaller(extensionContext.storagePath);
  kindCli = await detectKind(extensionContext.storagePath, installer);

  if (!kindCli) {
    if (await installer.isAvailable()) {
      const statusBarItem = extensionApi.window.createStatusBarItem();
      statusBarItem.text = 'Kind';
      statusBarItem.tooltip = 'Kind not found on your system, click to download and install it';
      statusBarItem.command = KIND_INSTALL_COMMAND;
      statusBarItem.iconClass = 'fa fa-exclamation-triangle';
      extensionContext.subscriptions.push(
        extensionApi.commands.registerCommand(KIND_INSTALL_COMMAND, () =>
          installer.performInstall().then(
            async status => {
              if (status) {
                statusBarItem.dispose();
                kindCli = await detectKind(extensionContext.storagePath, installer);
                createProvider(extensionContext);
              }
            },
            err => window.showErrorMessage('Kind installation failed ' + err),
          ),
        ),
      );
      statusBarItem.show();
    }
  } else {
    createProvider(extensionContext);
  }
}

export function deactivate(): void {
  console.log('stopping kind extension');
}
