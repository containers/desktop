---
sidebar_position: 2
title: Discover Podman Desktop
description: Discovering the Podman Desktop application
keywords: [podman desktop, podman, Discover features]
tags: [podman-desktop, discover-podman-desktop, features]
---

# Discover Podman Desktop

Podman Desktop is a community-driven tool that is an alternative to Podman and Docker tools. You can perform a wide range of basic and advanced tasks. From creating a container or pod to setting up a kubernetes cluster to running an AI application to integrating your local tools using extensions, Podman Desktop offers all these features to ease your daily development tasks. But, what makes Podman Desktop different from other similar community-driven tools?

The key differentiator is its intuitive UI interface that allows you to visualize your development environment. Be it the number of pods or Kubernetes clusters running or the number of deployments available or the number of services exposed, you can visualize your dev environment with a click. In addition, you have the option of running this tool on three different operating systems; macOS, Windows, and Linux. Podman Desktop runs your workloads on a Podman engine and therefore, provides you a Podman-native capabilities to interact with your applications. But, this does not mean you cannot run your Docker applications. You can use the Docker compatibility UI feature for a smooth transition to Podman Desktop.

Let’s quickly explore this tool’s key functionalities.

#### Manage containerized environment

![containers](img/containers-component.png)

Access the **Containers** component in the UI to do the container-related tasks:

- Create a container with a container or docker file or from an existing image.
- Create a pod with selected containers.
- [Deploy a container to a Kubernetes cluster](/docs/kubernetes/deploying-a-container-to-kubernetes).
- Search, start, restart, stop, or delete a container.
- Bulk deletion of selected containers.
- Export a container to your local machine.
- View the summary and logs of a container.
- View the kube configuration of the container if it is a Kubernetes resource.
- Interact with the container using a terminal.
- View containers based on their status, whether they are running or stopped.
- Remove all unused containers from the Podman engine for efficient memory usage.

For more details, refer to [Working with containers](/docs/containers).

#### Podify your containers

![pods](img/pods-component.png)

Access the **Pods** component in the UI to do the pod-related tasks:

- Create a pod from a Kubernetes YAML file.
- Search, start, restart, stop, or delete a pod.
- View the status of containers that are part of the pod, whether they are running, created, exited, or in waiting state.
- View the summary and logs of the pods
- Generate and view configuration for a Kubernetes pod.
- [Deploy a pod to a Kubernetes cluster](/docs/kubernetes/deploying-a-pod-to-kubernetes).
- Interact with the pod using a terminal.
- View pods based on their status, whether they are running or stopped.
- Remove all unused pods from the Podman engine for efficient memory usage.

#### Manage images

![images](img/images-component.png)

Access the **Images** component in the UI to do the image-related tasks:

- Build an image from a container or docker file.
- Pull an image from a registry.
- Search or delete an image.
- Create a container from the image.
- Push an image to a configured registry.
- Edit the image name and tag.
- View the image history.
- Save an image to your local machine.
- Push an image to a cluster.
- Import images from your local machine into the Podman Desktop application.

#### Manage Kubernetes-based environment

![kubernetes](img/kubernetes-component.png)

Access the **Kubernetes** component in the UI to do the Kubernetes-related tasks:

- Create an object after applying a kubernetes YAML configuration.
- Search or delete an object.
- View the summary and Kubernetes configuration of the object
- Edit the configuration of the Kube object and apply those changes to your cluster directly from the UI.

For more details, refer to [From containers to Kubernetes](/docs/kubernetes).

#### Manage Docker compatibility

Docker compatibility is a way to configure an environment in which you can run your Docker applications, commands, and tools on a Podman engine without reconfiguration. It encompasses two stages. You first [import your saved containers](/docs/migrating-from-docker/importing-saved-containers) into Podman Desktop using CLI and then access the [Docker Compatibility settings](/docs/migrating-from-docker/managing-docker-compatibility) to:

- Check the system socket mapping status
- On macOS: Use all Docker tools, including CLI, with the Podman engine
- Use the Podman CLI to run Compose applications
- Select a Docker CLI context

On macOS, consider installing the [podman-mac-helper tool](/docs/migrating-from-docker/using-podman-mac-helper) to use Docker commands with a Podman engine.

#### Integrate your tools using extensions

![extensions](img/extentions-component.png)

Podman Desktop provides a wide range of extensions that can be used to integrate your local tools with Podman Desktop. After installing the required extension, you can do development tasks like creating a Kube cluster, creating an AI application, or creating a bootable container. List of extensions available:

_Built-in extensions_

- Compose
- Podman
- Docker
- Kind
- Minikube
- Lima
- Kube Context
- Kubectl CLI
- Registries

_Other extensions_

- Bootable containers
- Image Layers Explorer
- Headlamp
- Podman AI Lab
- Red Hat extensions

You can enable or disable an extension, if needed. You can also create your own custom extensions to add icons, UI components, or menus to your application front-end page.

For more details, refer to [Extensions](/docs/extensions).

#### Manage settings

![settings](img/settings.png)

Access the **Settings** page in the UI to do these tasks:

- Create resources for your development environment
  - [Creating a Podman machine](/docs/podman/creating-a-podman-machine)
  - [Creating a Kind cluster](/docs/kind/creating-a-kind-cluster)
  - [Creating a Minikube cluster](/docs/minikube/creating-a-minikube-cluster)
- [Configure proxy URLs](/docs/proxy#using-a-proxy)
- [Configure a registry](/docs/containers/registries)
- Configure a CLI tool
- [Configure a Kubernetes context](/docs/kubernetes/viewing-and-selecting-current-kubernetes-context#procedure-using-the-podman-desktop-settings)