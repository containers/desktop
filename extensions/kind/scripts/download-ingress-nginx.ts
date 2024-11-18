#!/usr/bin/env node
/**********************************************************************
 * Copyright (C) 2024 Red Hat, Inc., Matthias Blümel
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

import * as fs from 'node:fs';
import * as path from 'node:path';
import { Octokit } from '@octokit/rest';
import type { OctokitOptions } from '@octokit/core/dist-types/types';

const KUBERNETES_ORG = 'kubernetes';
const NGINX_INGRESS_REPO = 'ingress-nginx';
const NGINX_DEPLOY_FILE = 'deploy.yaml';
const NGINX_DEPLOY_PATH = 'deploy/static/provider/kind';
const CONTOUR_VERSION = 'v1.11.3';

const octokitOptions: OctokitOptions = {};
if (process.env.GITHUB_TOKEN) {
  octokitOptions.auth = process.env.GITHUB_TOKEN;
}
const octokit = new Octokit(octokitOptions);

// to make this file a module
export {};

async function downloadIngressNginx(
  tagVersion: string,
  repoPath: string,
  fileName: string,
  destFileName: string,
): Promise<void> {
  const destDir = path.resolve(__dirname, '..', 'src', 'resources');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
  }
  const destFile = path.resolve(destDir, destFileName);
  console.log(
    `Downloading Contour manifests from https://github.com/${KUBERNETES_ORG}/${NGINX_INGRESS_REPO}/${NGINX_DEPLOY_PATH}/${NGINX_DEPLOY_FILE} version ${tagVersion}`,
  );
  const manifests = await octokit.rest.repos.getContent({
    owner: KUBERNETES_ORG,
    repo: NGINX_INGRESS_REPO,
    path: repoPath + '/' + fileName,
    ref: 'controller-' + tagVersion,
    headers: {
      accept: 'application/json',
    },
  });
  let buffer;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((manifests.data as any).encoding && (manifests.data as any).encoding === 'base64') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buffer = Buffer.from((manifests.data as any).content, 'base64');
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buffer = Buffer.from((manifests.data as any).content);
  }

  fs.writeFileSync(destFile, buffer);
  console.log(`Nginx.yaml available at ${destFile}`);
}

// grab the manifests from the given URL
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// download the file from the given URL and store the content in destFile
// particular contour file should be manually added to the repo once downloaded
// run download script on demand using `pnpm --cwd extensions/kind/ run install:contour`
downloadIngressNginx(CONTOUR_VERSION, NGINX_DEPLOY_PATH, NGINX_DEPLOY_FILE, 'ingress-nginx.yaml');
