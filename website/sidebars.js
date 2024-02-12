// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Generate sidebar from the docs folder (or versioned_docs/<version>)
  mySidebar: [
    'intro',
    {
      type: 'category',
      label: 'Installation',
      link: {
        type: 'generated-index',
        slug: '/installation',
      },
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'installation',
        },
      ],
    },
    {
      type: 'category',
      label: 'Restricted Environments',
      link: {
        type: 'generated-index',
        slug: '/proxy',
      },
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'proxy',
        },
      ],
    },
    {
      type: 'category',
      label: 'Podman',
      link: {
        type: 'generated-index',
        slug: '/podman',
      },
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'podman',
        },
      ],
    },
    {
      type: 'category',
      label: 'Migrating from Docker',
      link: {
        slug: '/migrating-from-docker',
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'migrating-from-docker',
        },
      ],
    },
    {
      type: 'category',
      label: 'Containers',
      link: {
        slug: '/containers',
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'containers',
        },
      ],
    },
    {
      type: 'category',
      label: 'Compose',
      link: {
        slug: '/compose',
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'compose',
        },
      ],
    },
    {
      type: 'category',
      label: 'Kubernetes',
      link: {
        slug: '/kubernetes',
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'kubernetes',
        },
      ],
    },
    {
      type: 'category',
      label: 'Kind',
      link: {
        slug: '/kind',
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'kind',
        },
      ],
    },
    {
      type: 'category',
      label: 'Minikube',
      link: {
        slug: '/minikube',
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'minikube',
        },
      ],
    },
    {
      type: 'category',
      label: 'Lima',
      link: {
        slug: '/lima',
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'lima',
        },
      ],
    },
    {
      type: 'category',
      label: 'OpenShift',
      link: {
        slug: '/openshift',
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'openshift',
        },
      ],
    },
    {
      type: 'category',
      label: 'Writing Extensions',
      link: {
        slug: '/extensions',
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'extensions',
        },
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      link: {
        slug: '/troubleshooting',
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'troubleshooting',
        },
      ],
    },
  ],
};

module.exports = sidebars;
