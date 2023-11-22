import { BaseJSErrorBreadcrumbType, BasePluginType, BasePromiseBreadcrumbType, BrowserEventTypes, TransportCategory } from '@/types'
import { getTimestampValue, parseStackFrames, toHashCode } from '@/comm'

const getTraceId = (breadcrumb: BasePromiseBreadcrumbType) => {
  return toHashCode([breadcrumb.type, breadcrumb.message, breadcrumb.errorType].join(',')).toString()
}
export const promiseErrorPlugin: BasePluginType = {
  name: BrowserEventTypes.UNHANDLEDREJECTION,
  client: null as any,
  install(client, emit) {
    this.client = client
    if (window) {
      window.addEventListener('unhandledrejection', (e) => {
        
        const breadcrumb: BasePromiseBreadcrumbType = {
          errorType: e.reason.name || 'unKnown',
          message: e.reason.message || e.reason,
          stack: JSON.stringify(parseStackFrames(e.reason)),
          timestamp: getTimestampValue().toString(),
          traceId: '',
          type: BrowserEventTypes.UNHANDLEDREJECTION,
          url: window.location.href,
          userAgent: navigator.userAgent
        }
        
        breadcrumb.traceId = getTraceId(breadcrumb)
        
        emit(breadcrumb)
      }, true)
    }
  },
  transform(breadcrumb: BaseJSErrorBreadcrumbType) {
    return {
      ...breadcrumb
    }
  },
  post(transformedData: BaseJSErrorBreadcrumbType) {
    this.client.transform(TransportCategory.ERROR, transformedData).then(r => this.client.send(r))
  }
}
