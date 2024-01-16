export enum Page {
  CONTAINERS = 'containers',
  CONTAINER = 'container',
  CONTAINER_LOGS = 'container-logs',
  CONTAINER_INSPECT = 'container-inspect',
  CONTAINER_TERMINAL = 'container-terminal',
  IMAGES = 'images',
  IMAGE = 'image',
  PODS = 'pods',
  POD = 'pod',
  VOLUMES = 'volumes',
  VOLUME = 'volume',
  CONTRIBUTION = 'contribution',
  TROUBLESHOOTING = 'troubleshooting',
  HELP = 'help',
}

export interface NavigateRequest {
  page: Page;
  parameters?: Record<string, string>;
}
