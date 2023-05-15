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

import type * as containerDesktopAPI from '@podman-desktop/api';
import { Disposable } from './types/disposable';
import Dockerode from 'dockerode';
import StreamValues from 'stream-json/streamers/StreamValues';
import type { ContainerCreateOptions, ContainerInfo, SimpleContainerInfo } from './api/container-info';
import type { ImageInfo } from './api/image-info';
import type { PodInfo, PodInspectInfo } from './api/pod-info';
import type { ImageInspectInfo } from './api/image-inspect-info';
import type { ProviderContainerConnectionInfo } from './api/provider-info';
import type { ImageRegistry } from './image-registry';
import type { PullEvent } from './api/pull-event';
import type { Telemetry } from './telemetry/telemetry';
import * as crypto from 'node:crypto';
import moment from 'moment';
const tar: { pack: (dir: string) => NodeJS.ReadableStream } = require('tar-fs');
import { EventEmitter } from 'node:events';
import type { ContainerInspectInfo } from './api/container-inspect-info';
import type { HistoryInfo } from './api/history-info';
import type {
  LibPod,
  PlayKubeInfo,
  PodCreateOptions,
  ContainerCreateOptions as PodmanContainerCreateOptions,
  PodInfo as LibpodPodInfo,
} from './dockerode/libpod-dockerode';
import { LibpodDockerode } from './dockerode/libpod-dockerode';
import type { ContainerStatsInfo } from './api/container-stats-info';
import type { VolumeInfo, VolumeInspectInfo, VolumeListInfo } from './api/volume-info';
import type { NetworkInspectInfo } from './api/network-info';
import type { Event } from './events/emitter';
import { Emitter } from './events/emitter';
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import type { ApiSenderType } from './api';
export interface InternalContainerProvider {
  name: string;
  id: string;
  connection: containerDesktopAPI.ContainerProviderConnection;
  // api not there if status is stopped
  api?: Dockerode;
  libpodApi?: LibPod;
}

export interface InternalContainerProviderLifecycle {
  internal: containerDesktopAPI.ProviderLifecycle;
  status: string;
}

interface JSONEvent {
  type: string;
  status: string;
  id: string;
  Type?: string;
}

export class ContainerProviderRegistry {
  private readonly _onEvent = new Emitter<JSONEvent>();
  readonly onEvent: Event<JSONEvent> = this._onEvent.event;

  constructor(
    private apiSender: ApiSenderType,
    private imageRegistry: ImageRegistry,
    private telemetryService: Telemetry,
  ) {
    const libPodDockerode = new LibpodDockerode();
    libPodDockerode.enhancePrototypeWithLibPod();
  }

  private containerProviders: Map<string, containerDesktopAPI.ContainerProviderConnection> = new Map();
  private internalProviders: Map<string, InternalContainerProvider> = new Map();

  handleEvents(api: Dockerode) {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('event', (jsonEvent: JSONEvent) => {
      console.log('event is', jsonEvent);
      this._onEvent.fire(jsonEvent);
      if (jsonEvent.status === 'stop' && jsonEvent?.Type === 'container') {
        // need to notify that a container has been stopped
        this.apiSender.send('container-stopped-event', jsonEvent.id);
      } else if (jsonEvent.status === 'init' && jsonEvent?.Type === 'container') {
        // need to notify that a container has been started
        this.apiSender.send('container-init-event', jsonEvent.id);
      } else if (jsonEvent.status === 'start' && jsonEvent?.Type === 'container') {
        // need to notify that a container has been started
        this.apiSender.send('container-started-event', jsonEvent.id);
      } else if (jsonEvent.status === 'destroy' && jsonEvent?.Type === 'container') {
        // need to notify that a container has been destroyed
        this.apiSender.send('container-stopped-event', jsonEvent.id);
      } else if (jsonEvent.status === 'die' && jsonEvent?.Type === 'container') {
        this.apiSender.send('container-die-event', jsonEvent.id);
      } else if (jsonEvent.status === 'kill' && jsonEvent?.Type === 'container') {
        this.apiSender.send('container-kill-event', jsonEvent.id);
      } else if (jsonEvent?.Type === 'pod') {
        this.apiSender.send('pod-event');
      } else if (jsonEvent?.Type === 'volume') {
        this.apiSender.send('volume-event');
      } else if (jsonEvent.status === 'remove' && jsonEvent?.Type === 'container') {
        this.apiSender.send('container-removed-event', jsonEvent.id);
      } else if (jsonEvent.status === 'pull' && jsonEvent?.Type === 'image') {
        // need to notify that image are being pulled
        this.apiSender.send('image-pull-event', jsonEvent.id);
      } else if (jsonEvent.status === 'tag' && jsonEvent?.Type === 'image') {
        // need to notify that image are being tagged
        this.apiSender.send('image-tag-event', jsonEvent.id);
      } else if (jsonEvent.status === 'untag' && jsonEvent?.Type === 'image') {
        // need to notify that image are being untagged
        this.apiSender.send('image-untag-event', jsonEvent.id);
      } else if (jsonEvent.status === 'remove' && jsonEvent?.Type === 'image') {
        // need to notify that image are being pulled
        this.apiSender.send('image-remove-event', jsonEvent.id);
      } else if (jsonEvent.status === 'delete' && jsonEvent?.Type === 'image') {
        // need to notify that image are being pulled
        this.apiSender.send('image-remove-event', jsonEvent.id);
      } else if (jsonEvent.status === 'build' && jsonEvent?.Type === 'image') {
        // need to notify that image are being pulled
        this.apiSender.send('image-build-event', jsonEvent.id);
      }
    });

    api.getEvents((err, stream) => {
      if (err) {
        console.log('error is', err);
      }
      const pipeline = stream?.pipe(StreamValues.withParser());
      pipeline?.on('error', error => {
        console.error('Error while parsing events', error);
      });
      pipeline?.on('data', data => {
        if (data?.value !== undefined) {
          eventEmitter.emit('event', data.value);
        }
      });
    });
  }

  registerContainerConnection(
    provider: containerDesktopAPI.Provider,
    containerProviderConnection: containerDesktopAPI.ContainerProviderConnection,
  ): Disposable {
    const providerName = containerProviderConnection.name;
    const id = `${provider.id}.${providerName}`;
    this.containerProviders.set(id, containerProviderConnection);
    this.telemetryService
      .track('registerContainerProviderConnection', {
        name: containerProviderConnection.name,
        type: containerProviderConnection.type,
        total: this.containerProviders.size,
      })
      .catch((err: unknown) => console.error('Unable to track', err));

    const internalProvider: InternalContainerProvider = {
      id,
      name: provider.name,
      connection: containerProviderConnection,
    };
    let previousStatus = containerProviderConnection.status();

    if (containerProviderConnection.status() === 'started') {
      internalProvider.api = new Dockerode({ socketPath: containerProviderConnection.endpoint.socketPath });
      if (containerProviderConnection.type === 'podman') {
        internalProvider.libpodApi = internalProvider.api as unknown as LibPod;
      }
      this.handleEvents(internalProvider.api);
    }

    // track the status of the provider
    const timer = setInterval(() => {
      const newStatus = containerProviderConnection.status();
      if (newStatus !== previousStatus) {
        if (newStatus === 'stopped') {
          internalProvider.api = undefined;
          internalProvider.libpodApi = undefined;
          this.apiSender.send('provider-change', {});
        }
        if (newStatus === 'started') {
          internalProvider.api = new Dockerode({ socketPath: containerProviderConnection.endpoint.socketPath });
          if (containerProviderConnection.type === 'podman') {
            internalProvider.libpodApi = internalProvider.api as unknown as LibPod;
          }
          this.handleEvents(internalProvider.api);
          this.internalProviders.set(id, internalProvider);
          this.apiSender.send('provider-change', {});
        }
        previousStatus = newStatus;
      }
    }, 2000);

    this.internalProviders.set(id, internalProvider);
    this.apiSender.send('provider-change', {});

    // listen to events

    return Disposable.create(() => {
      clearInterval(timer);
      this.internalProviders.delete(id);
      this.containerProviders.delete(id);
      this.apiSender.send('provider-change', {});
    });
  }

  // do not use inspect information
  async listSimpleContainers(): Promise<SimpleContainerInfo[]> {
    let telemetryOptions = {};
    const containers = await Promise.all(
      Array.from(this.internalProviders.values()).map(async provider => {
        try {
          const providerApi = provider.api;
          if (!providerApi) {
            return [];
          }

          const containers = await providerApi.listContainers({ all: true });
          return Promise.all(
            containers.map(async container => {
              const containerInfo: SimpleContainerInfo = {
                ...container,
                engineName: provider.name,
                engineId: provider.id,
                engineType: provider.connection.type,
              };
              return containerInfo;
            }),
          );
        } catch (error) {
          console.log('error in engine', provider.name, error);
          telemetryOptions = { error: error };
          return [];
        }
      }),
    );
    const flatttenedContainers = containers.flat();
    this.telemetryService.track(
      'listSimpleContainers',
      Object.assign({ total: flatttenedContainers.length }, telemetryOptions),
    )
    .catch((err: unknown) => console.error('Unable to track', err));;
    return flatttenedContainers;
  }

  async listContainers(): Promise<ContainerInfo[]> {
    let telemetryOptions = {};
    const containers = await Promise.all(
      Array.from(this.internalProviders.values()).map(async provider => {
        try {
          const providerApi = provider.api;
          if (!providerApi) {
            return [];
          }

          // grab time from the provider
          const providerInfo = await providerApi.info();
          // Current system-time in RFC 3339 format with nano-seconds.
          const vmTime = providerInfo.SystemTime;

          // we can't trust the time from the VM, so need to compute delta
          // between our time and the VM time
          // https://github.com/containers/podman/issues/11541
          const delta = moment().diff(vmTime);

          let pods: LibpodPodInfo[] = [];
          if (provider.libpodApi) {
            pods = await provider.libpodApi.listPods();
          }

          const containers = await providerApi.listContainers({ all: true });
          return Promise.all(
            containers.map(async container => {
              let StartedAt;
              if (container.State.toUpperCase() === 'RUNNING') {
                // grab additional field like StartedAt
                try {
                  const containerData = providerApi.getContainer(container.Id);
                  const containerInspect = await containerData.inspect();
                  // needs to adjust
                  const correctedDate = moment(containerInspect.State.StartedAt)
                    .add(delta, 'milliseconds')
                    .toISOString();
                  StartedAt = correctedDate;
                } catch (error) {
                  console.debug('Unable to get container, probably container is gone due to a short TTL', error);
                  StartedAt = '';
                  telemetryOptions = { error: error };
                }
              } else {
                StartedAt = '';
              }

              // do we have a matching pod for this container ?
              let pod;
              const matchingPod = pods.find(pod =>
                pod.Containers.find(containerOfPod => containerOfPod.Id === container.Id),
              );
              if (matchingPod) {
                pod = {
                  id: matchingPod.Id,
                  name: matchingPod.Name,
                  status: matchingPod.Status,
                  engineId: provider.id,
                };
              }
              const containerInfo: ContainerInfo = {
                ...container,
                pod,
                engineName: provider.name,
                engineId: provider.id,
                engineType: provider.connection.type,
                StartedAt,
              };
              return containerInfo;
            }),
          );
        } catch (error) {
          console.log('error in engine', provider.name, error);
          telemetryOptions = { error: error };
          return [];
        }
      }),
    );
    const flatttenedContainers = containers.flat();
    this.telemetryService.track(
      'listContainers',
      Object.assign({ total: flatttenedContainers.length }, telemetryOptions),
    )
    .catch((err: unknown) => console.error('Unable to track', err));;
    return flatttenedContainers;
  }

  async listImages(): Promise<ImageInfo[]> {
    let telemetryOptions = {};
    const images = await Promise.all(
      Array.from(this.internalProviders.values()).map(async provider => {
        try {
          if (!provider.api) {
            return [];
          }
          const images = await provider.api.listImages({ all: false });
          return images.map(image => {
            const imageInfo: ImageInfo = { ...image, engineName: provider.name, engineId: provider.id };
            return imageInfo;
          });
        } catch (error) {
          console.log('error in engine', provider.name, error);
          telemetryOptions = { error: error };
          return [];
        }
      }),
    );
    const flatttenedImages = images.flat();
    this.telemetryService.track('listImages', Object.assign({ total: flatttenedImages.length }, telemetryOptions)).catch((err: unknown) => console.error('Unable to track', err));

    return flatttenedImages;
  }

  async pruneImages(engineId: string): Promise<void> {
    // We have to use two different API calls for pruning images, because the Podman API does not respect the 'dangling' filter
    // and instead uses 'all' and 'external'. See: https://github.com/containers/podman/issues/11576
    // so for Dockerode we'll have to call pruneImages with the 'dangling' filter, and for Podman we'll have to call pruneImages

    // PODMAN:
    // Have to use podman API directly for pruning images
    // TODO: Remove this once the Podman API respects the 'dangling' filter: https://github.com/containers/podman/issues/17614
    let telemetryOptions = {};
    try {
      const provider = this.internalProviders.get(engineId);
      if (provider?.libpodApi) {
        await this.getMatchingPodmanEngine(engineId).pruneAllImages(true);
        return;
      }

      // DOCKER:
      // Return Promise<void> for this call, because Dockerode does not return anything
      await this.getMatchingEngine(engineId).pruneImages({ filters: { dangling: { false: true } } });
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('pruneImages', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async listPods(): Promise<PodInfo[]> {
    let telemetryOptions = {};
    const pods = await Promise.all(
      Array.from(this.internalProviders.values()).map(async provider => {
        try {
          if (!provider.libpodApi) {
            return [];
          }
          const pods = await provider.libpodApi.listPods();
          return pods.map(pod => {
            const podInfo: PodInfo = { ...pod, engineName: provider.name, engineId: provider.id, kind: 'podman' };
            return podInfo;
          });
        } catch (error) {
          console.log('error in engine', provider.name, error);
          telemetryOptions = { error: error };
          return [];
        }
      }),
    );
    const flatttenedPods = pods.flat();
    this.telemetryService.track('listPods', Object.assign({ total: flatttenedPods.length }, telemetryOptions)).catch((err: unknown) => console.error('Unable to track', err));;

    return flatttenedPods;
  }

  async listNetworks(): Promise<NetworkInspectInfo[]> {
    let telemetryOptions = {};
    const networks = await Promise.all(
      Array.from(this.internalProviders.values()).map(async provider => {
        try {
          if (!provider.api) {
            return [];
          }
          const networks = await provider.api.listNetworks();
          return networks.map(network => {
            const networkInfo: NetworkInspectInfo = { ...network, engineName: provider.name, engineId: provider.id };
            return networkInfo;
          });
        } catch (error) {
          console.log('error in engine when listing networks', provider.name, error);
          telemetryOptions = { error: error };
          return [];
        }
      }),
    );
    const flatttenedNetworks = networks.flat();
    this.telemetryService.track('listNetworks', Object.assign({ total: flatttenedNetworks.length }, telemetryOptions)).catch((err: unknown) => console.error('Unable to track', err));;

    return flatttenedNetworks;
  }

  async listVolumes(): Promise<VolumeListInfo[]> {
    let telemetryOptions = {};
    const volumes = await Promise.all(
      Array.from(this.internalProviders.values()).map(async provider => {
        try {
          if (!provider.api) {
            return [];
          }

          // grab the storage information
          const storageDefinition = await provider.api.df();

          // grab containers
          const containers = await provider.api.listContainers({ all: true });

          // any as there is a CreatedAt field missing in the type
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const volumeListInfo: any = await provider.api.listVolumes();
          const engineName = provider.name;
          const engineId = provider.id;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const volumeInfos = volumeListInfo.Volumes.map((volumeList: any) => {
            const volumeInfo: VolumeInfo = { ...volumeList, engineName, engineId };

            // do we have a matching volume in storage definition ?
            const matchingVolume = (storageDefinition.Volumes || []).find(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (volumeStorage: any) => volumeStorage.Name === volumeInfo.Name,
            );
            if (matchingVolume) {
              volumeInfo.UsageData = matchingVolume.UsageData;
            }

            // if refCount > 0, we need to find the container using it
            const containersUsingThisVolume = containers
              .filter(container => container.Mounts.find(mount => mount.Name === volumeInfo.Name))
              .map(container => {
                return { id: container.Id, names: container.Names };
              });
            volumeInfo.containersUsage = containersUsingThisVolume;

            // invalid in Podman https://github.com/containers/podman/issues/15720
            if (volumeInfo.UsageData) {
              volumeInfo.UsageData.RefCount = volumeInfo.containersUsage.length;
            }

            return volumeInfo;
          });
          return { Volumes: volumeInfos, Warnings: volumeListInfo.Warnings, engineName, engineId };
        } catch (error) {
          console.log('error in engine', provider.name, error);
          telemetryOptions = { error: error };
          return [];
        }
      }),
    );
    const flatttenedVolumes: VolumeListInfo[] = volumes.flat();
    this.telemetryService.track('listVolumes', Object.assign({ total: flatttenedVolumes.length }, telemetryOptions)).catch((err: unknown) => console.error('Unable to track', err));
    return flatttenedVolumes;
  }

  async getVolumeInspect(engineId: string, volumeName: string): Promise<VolumeInspectInfo> {
    let telemetryOptions = {};
    try {
      // need to find the container engine of the container
      const provider = this.internalProviders.get(engineId);
      if (!provider) {
        throw new Error('no engine matching this container');
      }
      if (!provider.api) {
        throw new Error('no running provider for the matching container');
      }
      const volumeObject = provider.api.getVolume(volumeName);
      const volumeInspect = await volumeObject.inspect();
      return {
        engineName: provider.name,
        engineId: provider.id,
        ...volumeInspect,
      };
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('volumeInspect', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async removeVolume(engineId: string, volumeName: string): Promise<void> {
    let telemetryOptions = {};
    try {
      return this.getMatchingEngine(engineId).getVolume(volumeName).remove();
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('removeVolume', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  protected getMatchingEngine(engineId: string): Dockerode {
    // need to find the container engine of the container
    const engine = this.internalProviders.get(engineId);
    if (!engine) {
      throw new Error('no engine matching this engine');
    }
    if (!engine.api) {
      throw new Error('no running provider for the matching engine');
    }
    return engine.api;
  }

  protected getMatchingPodmanEngine(engineId: string): LibPod {
    // need to find the container engine of the container
    const engine = this.internalProviders.get(engineId);
    if (!engine) {
      throw new Error('no engine matching this engine');
    }
    if (!engine.api) {
      throw new Error('no running provider for the matching engine');
    }
    if (!engine.libpodApi) {
      throw new Error('LibPod is not supported by this engine');
    }
    return engine.libpodApi;
  }

  public getFirstRunningConnection(): [ProviderContainerConnectionInfo, Dockerode] {
    // grab all connections
    const matchingContainerProviders = Array.from(this.internalProviders.entries()).filter(
      containerProvider => containerProvider[1].api,
    );
    if (!matchingContainerProviders || matchingContainerProviders.length === 0) {
      throw new Error('No provider with a running engine');
    }

    const matchingConnection = matchingContainerProviders[0];
    if (!matchingConnection[1].api) {
      throw new Error('No provider with a running engine');
    }

    const matchingConnectionName = matchingConnection[0];
    const matchingConnectionObject = this.containerProviders.get(matchingConnectionName);
    if (!matchingConnectionObject) {
      throw new Error('Unable to find a running engine');
    }

    return [
      {
        name: matchingConnectionObject.name,
        endpoint: {
          socketPath: matchingConnectionObject.endpoint.socketPath,
        },
      } as ProviderContainerConnectionInfo,
      matchingConnection[1].api,
    ];
  }

  protected getMatchingEngineFromConnection(
    providerContainerConnectionInfo: ProviderContainerConnectionInfo,
  ): Dockerode {
    // grab all connections
    const matchingContainerProvider = Array.from(this.internalProviders.values()).find(
      containerProvider =>
        containerProvider.connection.endpoint.socketPath === providerContainerConnectionInfo.endpoint.socketPath &&
        containerProvider.connection.name === providerContainerConnectionInfo.name,
    );
    if (!matchingContainerProvider?.api) {
      throw new Error('no running provider for the matching container');
    }
    return matchingContainerProvider.api;
  }

  protected getMatchingContainer(engineId: string, id: string): Dockerode.Container {
    return this.getMatchingEngine(engineId).getContainer(id);
  }

  protected getMatchingImage(engineId: string, imageId: string): Dockerode.Image {
    return this.getMatchingEngine(engineId).getImage(imageId);
  }

  async stopContainer(engineId: string, id: string): Promise<void> {
    let telemetryOptions = {};
    try {
      return this.getMatchingContainer(engineId, id).stop();
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('stopContainer', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async deleteImage(engineId: string, id: string): Promise<void> {
    let telemetryOptions = {};
    try {
      // use force to delete it even it is running
      return this.getMatchingImage(engineId, id).remove({ force: true });
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('deleteImage', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  getImageName(inspectInfo: Dockerode.ImageInspectInfo) {
    const tags = inspectInfo.RepoTags;
    if (!tags) {
      throw new Error('Cannot push an image without a tag');
    }
    // take the first tag
    return tags[0];
  }

  async pushImage(engineId: string, imageTag: string, callback: (name: string, data: string) => void): Promise<void> {
    let telemetryOptions = {};
    try {
      const engine = this.getMatchingEngine(engineId);
      const image = engine.getImage(imageTag);
      const authconfig = this.imageRegistry.getAuthconfigForImage(imageTag);
      const pushStream = await image.push({ authconfig });
      pushStream.on('end', () => {
        callback('end', '');
      });
      let firstMessage = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pushStream.on('data', (chunk: any) => {
        if (firstMessage) {
          firstMessage = false;
          callback('first-message', '');
        }
        callback('data', chunk.toString('utf-8'));
      });
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track(
        'pushImage',
        Object.assign({ imageName: this.getImageHash(imageTag) }, telemetryOptions),
      ).catch((err: unknown) => console.error('Unable to track', err));;
    }
  }
  async pullImage(
    providerContainerConnectionInfo: ProviderContainerConnectionInfo,
    imageName: string,
    callback: (event: PullEvent) => void,
  ): Promise<void> {
    let telemetryOptions = {};
    try {
      const authconfig = this.imageRegistry.getAuthconfigForImage(imageName);
      const matchingEngine = this.getMatchingEngineFromConnection(providerContainerConnectionInfo);
      const pullStream = await matchingEngine.pull(imageName, {
        authconfig,
      });
      // eslint-disable-next-line @typescript-eslint/ban-types
      let resolve: () => void;
      let reject: (err: Error) => void;
      const promise = new Promise<void>((res, rej) => {
        resolve = res;
        reject = rej;
      });

      // eslint-disable-next-line @typescript-eslint/ban-types
      const onFinished = (err: Error | null) => {
        if (err) {
          return reject(err);
        }
        resolve();
      };

      const onProgress = (event: PullEvent) => {
        callback(event);
      };
      matchingEngine.modem.followProgress(pullStream, onFinished, onProgress);

      return promise;
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track(
        'pullImage',
        Object.assign({ imageName: this.getImageHash(imageName) }, telemetryOptions),
      ).catch((err: unknown) => console.error('Unable to track', err));;
    }
  }

  getImageHash(imageName: string): string {
    return crypto.createHash('sha512').update(imageName).digest('hex');
  }

  async deleteContainer(engineId: string, id: string): Promise<void> {
    let telemetryOptions = {};
    try {
      // use force to delete it even it is running
      return this.getMatchingContainer(engineId, id).remove({ force: true });
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('deleteContainer', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async startContainer(engineId: string, id: string): Promise<void> {
    let telemetryOptions = {};
    try {
      return this.getMatchingContainer(engineId, id).start();
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('startContainer', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async generatePodmanKube(engineId: string, names: string[]): Promise<string> {
    let telemetryOptions = {};
    try {
      return this.getMatchingPodmanEngine(engineId).generateKube(names);
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('generatePodmanKube', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async startPod(engineId: string, podId: string): Promise<void> {
    let telemetryOptions = {};
    try {
      return this.getMatchingPodmanEngine(engineId).startPod(podId);
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('startPod', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async createPod(
    selectedProvider: ProviderContainerConnectionInfo,
    podOptions: PodCreateOptions,
  ): Promise<{ engineId: string; Id: string }> {
    let telemetryOptions = {};
    try {
      // grab all connections
      const matchingContainerProvider = Array.from(this.internalProviders.values()).find(
        containerProvider =>
          containerProvider.connection.endpoint.socketPath === selectedProvider.endpoint.socketPath &&
          containerProvider.connection.name === selectedProvider.name,
      );
      if (!matchingContainerProvider?.libpodApi) {
        throw new Error('No provider with a running engine');
      }
      const result = await matchingContainerProvider.libpodApi.createPod(podOptions);
      return { Id: result.Id, engineId: matchingContainerProvider.id };
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('createPod', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async restartPod(engineId: string, podId: string): Promise<void> {
    let telemetryOptions = {};
    try {
      return this.getMatchingPodmanEngine(engineId).restartPod(podId);
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('restartPod', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async replicatePodmanContainer(
    source: { engineId: string; id: string },
    target: { engineId: string },
    overrideParameters: PodmanContainerCreateOptions,
  ): Promise<{ Id: string; Warnings: string[] }> {
    let telemetryOptions = {};
    try {
      // will publish in the target engine
      const libPod = this.getMatchingPodmanEngine(target.engineId);

      // grab content of the current container to replicate
      const containerToReplicate = await this.getContainerInspect(source.engineId, source.id);

      // convert env from array of string to an object with key being the env name
      const updatedEnv = containerToReplicate.Config.Env.reduce((acc: { [key: string]: string }, env) => {
        const [key, value] = env.split('=');
        acc[key] = value;
        return acc;
      }, {});

      // build create container configuration
      const originalConfiguration = {
        command: containerToReplicate.Config.Cmd,
        entrypoint: containerToReplicate.Config.Entrypoint,
        env: updatedEnv,
        image: containerToReplicate.Config.Image,
      };

      // add extra information
      const configuration = {
        ...originalConfiguration,
        ...overrideParameters,
      };
      return libPod.createPodmanContainer(configuration);
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('replicatePodmanContainer', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async stopPod(engineId: string, podId: string): Promise<void> {
    let telemetryOptions = {};
    try {
      return this.getMatchingPodmanEngine(engineId).stopPod(podId);
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('stopPod', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async removePod(engineId: string, podId: string): Promise<void> {
    let telemetryOptions = {};
    try {
      return this.getMatchingPodmanEngine(engineId).removePod(podId);
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('removePod', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async prunePods(engineId: string): Promise<void> {
    let telemetryOptions = {};
    try {
      return this.getMatchingPodmanEngine(engineId).prunePods();
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('prunePods', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async pruneContainers(engineId: string): Promise<Dockerode.PruneContainersInfo> {
    let telemetryOptions = {};
    try {
      return this.getMatchingEngine(engineId).pruneContainers();
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('pruneContainers', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async pruneVolumes(engineId: string): Promise<Dockerode.PruneVolumesInfo> {
    let telemetryOptions = {};
    try {
      return this.getMatchingEngine(engineId).pruneVolumes();
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('pruneVolumes', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async restartContainer(engineId: string, id: string): Promise<void> {
    let telemetryOptions = {};
    try {
      return this.getMatchingContainer(engineId, id).restart();
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('restartContainer', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async logsContainer(engineId: string, id: string, callback: (name: string, data: string) => void): Promise<void> {
    let telemetryOptions = {};
    try {
      let firstMessage = true;
      const container = this.getMatchingContainer(engineId, id);
      const containerStream = await container.logs({
        follow: true,
        stdout: true,
        stderr: true,
      });

      containerStream.on('end', () => {
        callback('end', '');
      });

      containerStream.on('data', chunk => {
        if (firstMessage) {
          firstMessage = false;
          callback('first-message', '');
        }
        callback('data', chunk.toString('utf-8'));
      });
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('logsContainer', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async shellInContainer(
    engineId: string,
    id: string,
    onData: (data: Buffer) => void,
  ): Promise<(param: string) => void> {
    let telemetryOptions = {};
    try {
      const exec = await this.getMatchingContainer(engineId, id).exec({
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Cmd: ['/bin/sh'],
        Tty: true,
      });

      const execStream = await exec.start({
        Tty: true,
        stdin: true,
        hijack: true,
      });

      execStream.on('data', chunk => {
        onData(chunk.toString('utf-8'));
      });

      return (param: string) => {
        execStream.write(param);
      };
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('shellInContainer', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async createAndStartContainer(engineId: string, options: ContainerCreateOptions): Promise<void> {
    let telemetryOptions = {};
    try {
      // need to find the container engine of the container
      const engine = this.internalProviders.get(engineId);
      if (!engine) {
        throw new Error('no engine matching this container');
      }
      if (!engine.api) {
        throw new Error('no running provider for the matching container');
      }
      const container = await engine.api.createContainer(options);
      return container.start();
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('createAndStartContainer', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async getImageInspect(engineId: string, id: string): Promise<ImageInspectInfo> {
    let telemetryOptions = {};
    try {
      // need to find the container engine of the container
      const provider = this.internalProviders.get(engineId);
      if (!provider) {
        throw new Error('no engine matching this container');
      }
      if (!provider.api) {
        throw new Error('no running provider for the matching container');
      }
      const imageObject = provider.api.getImage(id);
      const imageInspect = await imageObject.inspect();
      return {
        engineName: provider.name,
        engineId: provider.id,
        ...imageInspect,
      };
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('imageInspect', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async getImageHistory(engineId: string, id: string): Promise<HistoryInfo[]> {
    let telemetryOptions = {};
    try {
      // need to find the container engine of the container
      const provider = this.internalProviders.get(engineId);
      if (!provider) {
        throw new Error('no engine matching this container');
      }
      if (!provider.api) {
        throw new Error('no running provider for the matching container');
      }
      const imageObject = provider.api.getImage(id);
      return imageObject.history();
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('imageHistory', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async getContainerInspect(engineId: string, id: string): Promise<ContainerInspectInfo> {
    let telemetryOptions = {};
    try {
      // need to find the container engine of the container
      const provider = this.internalProviders.get(engineId);
      if (!provider) {
        throw new Error('no engine matching this container');
      }
      if (!provider.api) {
        throw new Error('no running provider for the matching container');
      }

      const containerObject = provider.api.getContainer(id);
      const containerInspect = await containerObject.inspect();
      return {
        engineName: provider.name,
        engineId: provider.id,
        ...containerInspect,
      };
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('containerInspect', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async saveImage(engineId: string, id: string, filename: string): Promise<void> {
    let telemetryOptions = {};
    try {
      // need to find the container engine of the container
      const provider = this.internalProviders.get(engineId);
      if (!provider) {
        throw new Error('no engine matching this container');
      }
      if (!provider.api) {
        throw new Error('no running provider for the matching container');
      }

      const imageObject = provider.api.getImage(id);
      if (imageObject) {
        const imageStream = await imageObject.get();
        return pipeline(imageStream, fs.createWriteStream(filename));
      }
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('imageSave', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async getPodInspect(engineId: string, id: string): Promise<PodInspectInfo> {
    let telemetryOptions = {};
    try {
      // need to find the container engine of the container
      const provider = this.internalProviders.get(engineId);
      if (!provider) {
        throw new Error('no engine matching this container');
      }
      if (!provider.libpodApi) {
        throw new Error('no running provider for the matching container');
      }

      const containerInspect = await provider.libpodApi.getPodInspect(id);
      return {
        engineName: provider.name,
        engineId: provider.id,
        ...containerInspect,
      };
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('podInspect', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  private statsConsumerId = 0;
  private statsConsumer = new Map<number, NodeJS.ReadableStream>();

  async stopContainerStats(id: number): Promise<void> {
    const consumer = this.statsConsumer.get(id);
    if (consumer) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (consumer as any).destroy();
      this.statsConsumer.delete(id);
    }
  }

  async getContainerStats(
    engineId: string,
    id: string,
    callback: (stats: ContainerStatsInfo) => void,
  ): Promise<number> {
    let telemetryOptions = {};
    try {
      // need to find the container engine of the container
      const provider = this.internalProviders.get(engineId);
      if (!provider) {
        throw new Error('no engine matching this container');
      }
      if (!provider.api) {
        throw new Error('no running provider for the matching container');
      }

      const containerObject = provider.api.getContainer(id);
      this.statsConsumerId++;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let stream: any;
      try {
        stream = (await containerObject.stats({ stream: true })) as unknown as NodeJS.ReadableStream;
        this.statsConsumer.set(this.statsConsumerId, stream);

        const pipeline = stream?.pipe(StreamValues.withParser());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pipeline?.on('error', (error: any) => {
          console.error('Error while grabbing stats', error);
          try {
            stream?.destroy();
            this.statsConsumer.delete(this.statsConsumerId);
          } catch (error) {
            console.error('Error while destroying stream', error);
          }
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pipeline?.on('data', (data: any) => {
          if (data?.value) {
            callback({
              engineName: provider.name,
              engineId: provider.id,
              ...data.value,
            });
          }
        });
      } catch (error) {
        // try to destroy the stream
        stream?.destroy();
        this.statsConsumer.delete(this.statsConsumerId);
      }

      return this.statsConsumerId;
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('containerStats', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async playKube(
    kubernetesYamlFilePath: string,
    selectedProvider: ProviderContainerConnectionInfo,
  ): Promise<PlayKubeInfo> {
    this.telemetryService.track('playKube').catch((err: unknown) => console.error('Unable to track', err));
    // grab all connections
    const matchingContainerProvider = Array.from(this.internalProviders.values()).find(
      containerProvider =>
        containerProvider.connection.endpoint.socketPath === selectedProvider.endpoint.socketPath &&
        containerProvider.name === selectedProvider.name,
    );
    if (!matchingContainerProvider?.libpodApi) {
      throw new Error('No provider with a running engine');
    let telemetryOptions = {};
    try {
      // grab all connections
      const matchingContainerProvider = Array.from(this.internalProviders.values()).find(
        containerProvider =>
          containerProvider.connection.endpoint.socketPath === selectedProvider.endpoint.socketPath &&
          containerProvider.name === selectedProvider.name,
      );
      if (!matchingContainerProvider || !matchingContainerProvider.libpodApi) {
        throw new Error('No provider with a running engine');
      }
      return matchingContainerProvider.libpodApi.playKube(kubernetesYamlFilePath);
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('playKube', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }

  async buildImage(
    containerBuildContextDirectory: string,
    relativeContainerfilePath: string,
    imageName: string,
    selectedProvider: ProviderContainerConnectionInfo,
    eventCollect: (eventName: 'stream' | 'error' | 'finish', data: string) => void,
  ): Promise<unknown> {
    try {
      // grab all connections
      const matchingContainerProvider = Array.from(this.internalProviders.values()).find(
        containerProvider =>
          containerProvider.connection.endpoint.socketPath === selectedProvider.endpoint.socketPath &&
          containerProvider.connection.name === selectedProvider.name &&
          selectedProvider.status === 'started',
      );
      if (!matchingContainerProvider?.api) {
        throw new Error('No provider with a running engine');
      }

      // grab auth for all registries
      const registryconfig = this.imageRegistry.getRegistryConfig();
      eventCollect(
        'stream',
        `Uploading the build context from ${containerBuildContextDirectory}...Can take a while...\r\n`,
      );
      const tarStream = tar.pack(containerBuildContextDirectory);
      let streamingPromise;
      try {
        streamingPromise = await matchingContainerProvider.api.buildImage(tarStream, {
          registryconfig,
          dockerfile: relativeContainerfilePath,
          t: imageName,
        });
      } catch (error: unknown) {
        console.log('error in buildImage', error);
        const errorMessage = error instanceof Error ? error.message : '' + error;
        eventCollect('error', errorMessage);
        throw error;
      }
      eventCollect('stream', `Building ${imageName}...\r\n`);
      // eslint-disable-next-line @typescript-eslint/ban-types
      let resolve: (output: {}) => void;
      let reject: (err: Error) => void;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });

      // eslint-disable-next-line @typescript-eslint/ban-types
      const onFinished = (err: Error | null, output: {}) => {
        if (err) {
          eventCollect('finish', err.message);
          return reject(err);
        }
        eventCollect('finish', '');
        resolve(output);
      };

      const onProgress = (event: {
        stream?: string;
        status?: string;
        progress?: string;
        error?: string;
        errorDetails?: { message?: string };
      }) => {
        if (event.stream) {
          eventCollect('stream', event.stream);
        } else if (event.error) {
          eventCollect('error', event.error);
        }
      };

      matchingContainerProvider.api.modem.followProgress(streamingPromise, onFinished, onProgress);
      return promise;
    } catch (error) {
      telemetryOptions = { error: error };
      throw error;
    } finally {
      this.telemetryService.track('buildImage', telemetryOptions).catch((err: unknown) => console.error('Unable to track', err));
    }
  }
}
