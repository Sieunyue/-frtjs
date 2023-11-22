

export const enum TransportCategory {
  PV = 'pv',
  PERF ='perf',
  API ='api',
  ERROR ='error',
  CUSTOM = 'custom'
}
export const enum BrowserEventTypes  {
  XHR = 'xhr',
  FETCH = 'fetch',
  JS = 'js',
  DOM = 'dom',
  RESOURCE = 'resource',
  UNHANDLEDREJECTION = 'unhandledrejection',
  ROUTER = 'router'
}

export type EventTypes = BrowserEventTypes

