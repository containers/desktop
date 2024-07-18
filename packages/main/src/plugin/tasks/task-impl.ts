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
import type { Event, Task, TaskAction, TaskState, TaskUpdateEvent } from '@podman-desktop/api';

import { Emitter } from '/@/plugin/events/emitter.js';

export class TaskImpl implements Task {
  public readonly started: number;

  protected emitter: Emitter<TaskUpdateEvent> | undefined;
  protected mProgress: number | undefined;
  protected mAction: TaskAction | undefined;
  protected mError: string | undefined;
  protected mState: TaskState;
  protected mName: string;

  constructor(
    public readonly id: string,
    name: string,
  ) {
    this.mName = name;
    this.mState = 'loading';
    this.started = new Date().getTime();
  }

  get name(): string {
    return this.mName;
  }

  set name(name: string) {
    this.mName = name;
    this.notify();
  }

  get action(): TaskAction | undefined {
    return this.mAction;
  }

  get state(): TaskState {
    return this.mState;
  }

  set state(state: TaskState) {
    this.mState = state;
    this.notify();
  }

  set action(action: TaskAction | undefined) {
    this.mAction = action;
    this.notify();
  }

  set error(error: string | undefined) {
    this.mError = error;
    if (error) {
      this.mState = 'error';
    }
    this.notify();
  }

  get error(): string | undefined {
    return this.mError;
  }

  get progress(): number | undefined {
    return this.mProgress;
  }

  set progress(progress: number | undefined) {
    this.mProgress = progress;
    this.notify();
  }

  protected notify(action: 'update' | 'delete' = 'update'): void {
    this.emitter?.fire({ action: action, task: this });
  }

  dispose(): void {
    this.notify('delete');
    this.emitter?.dispose();
  }

  get onUpdate(): Event<TaskUpdateEvent> {
    if (!this.emitter) {
      this.emitter = new Emitter<TaskUpdateEvent>();
    }
    return this.emitter.event;
  }
}
