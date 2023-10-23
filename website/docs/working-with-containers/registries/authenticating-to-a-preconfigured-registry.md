---
sidebar_position: 10
title: Authenticating to a registry
description: Authenticating to a pre-configured registry.
keywords: [podman desktop, podman, containers, registry, registries]
tags: [images]
---

# Authenticating to a pre-configured registry

With Podman Desktop, you can authenticate to a set of pre-configured registries:

- Red Hat Quay
- Docker Hub
- GitHub
- Google Container registry

#### Prerequisites

- You have credentials on a pre-configured image registry.

#### Procedure

1. Go to **<icon icon="fa-solid fa-cog" size="lg" /> Settings > Registries**.
1. On your registry line, click **Configure**.

   1. **User name**: Enter your user name.
   1. **Password**: Enter your password or OAuth secret.
   1. Click **Login**.

   ![Authenticating to a preconfigured registry](img/authenticating-to-a-preconfigured-registry.png)

#### Verification

1. Go to **<icon icon="fa-solid fa-cloud" size="lg" /> Images**.
1. You can pull a private image from the registry.
1. You can push an image to the registry:
   1. Build an image the fully qualified name required for your registry, such as `quay.io/my-repository/my-image`, `ghcr.io/my-repository/my-image`, or `docker.io/my-repository/my-image`.
   1. On your image line, click **<icon icon="fa-solid fa-ellipsis-v" size="lg" />**.
   1. The contextual menu has a **<icon icon="fa-solid fa-arrow-up" size="lg" />Push Image** entry.
