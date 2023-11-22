import { BaseJSErrorBreadcrumbType, BasePluginType, BrowserEventTypes, TransportCategory } from '@/types'
import { getTimestampValue, isJsError, parseStackFrames, toHashCode } from '@/comm'

const getTraceId = (breadcrumb: BaseJSErrorBreadcrumbType) => {
  return toHashCode([breadcrumb.filename, breadcrumb.functionName, breadcrumb.position].join(',')).toString()
}
export const jsErrorPlugin: BasePluginType = {
  name: BrowserEventTypes.JS,
  client: null as any,
  install(client,emit) {
    if (window) {
      this.client = client
      window.addEventListener('error', (e) => {
        if(!isJsError(e)) return
        const stacks = parseStackFrames(e.error)
        
        const breadcrumb: BaseJSErrorBreadcrumbType = {
          filename: stacks[0]?.filename ?? '',
          errorType: e.error.name,
          position: stacks[0]?.lineno + ':' + stacks[0]?.colno,
          stack: JSON.stringify(stacks),
          traceId: '',
          url: window.location.href,
          timestamp: getTimestampValue().toString(),
          userAgent: navigator.userAgent,
          type: BrowserEventTypes.JS,
          message: e.error.message,
          functionName: stacks[0]?.functionName ?? ''
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
