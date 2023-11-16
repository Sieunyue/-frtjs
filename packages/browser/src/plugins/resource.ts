import { BaseJSErrorBreadcrumbType, BasePluginType, BaseResourceBreadcrumbType, BrowserEventTypes, TransportCategory } from '@frtjs/types'
import {  getTimestampValue, isResourceError, toHashCode } from '@frtjs/comm'

const getTraceId = (breadcrumb: BaseResourceBreadcrumbType) => {
  return toHashCode([breadcrumb.type, breadcrumb.filename, breadcrumb.tagName].join(',')).toString()
}
export const ResErrorPlugin: BasePluginType = {
  name: BrowserEventTypes.RESOURCE,
  trace(emit) {
    if (window) {
      window.addEventListener('error', (e: Event) => {
        if (!isResourceError(e)) return
        const target = e.target as (HTMLLinkElement | HTMLImageElement)
        
        
        const breadcrumb: BaseResourceBreadcrumbType = {
          filename: (target as HTMLLinkElement).href || (target as HTMLImageElement).src,
          message: '',
          tagName: target.tagName,
          timestamp: getTimestampValue().toString(),
          traceId: '',
          type: BrowserEventTypes.RESOURCE,
          url: window.location.href,
          userAgent: navigator.userAgent,
          outerHTML: target.outerHTML
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
