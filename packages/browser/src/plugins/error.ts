import { BaseJSErrorBreadcrumbType, BasePluginType } from '@frtjs/types'
import { BrowserEventTypes, getTimestampValue, isJsError, parseStackFrames, toHashCode, TransportCategory } from '@frtjs/comm'

const getTraceId = (breadcrumb: BaseJSErrorBreadcrumbType) => {
  return toHashCode([breadcrumb.filename, breadcrumb.functionName, breadcrumb.position].join(',')).toString()
}
export const jsErrorPlugin: BasePluginType = {
  name: BrowserEventTypes.JS,
  trace(emit) {
    if (window) {
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
    this.transport.send(TransportCategory.ERROR, transformedData)
  }
}
