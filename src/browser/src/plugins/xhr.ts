import { BaseJSErrorBreadcrumbType, BasePluginType, BaseXhrBreadcrumbType, BrowserEventTypes, TransportCategory } from '@/types'
import { getTimestampValue, toHashCode } from '@/comm'
import { BrowserClientType } from '../client.js'

const getTraceId = (breadcrumb: BaseXhrBreadcrumbType) => {
  return toHashCode([breadcrumb.type, breadcrumb.method, breadcrumb.xhrUrl].join(',')).toString()
}
export const xhrErrorPlugin: BasePluginType<BrowserClientType> = {
  name: BrowserEventTypes.XHR,
  client: null as any,
  install(client, emit) {
    this.client = client
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const clientThis = this
    if ('XMLHttpRequest' in window && typeof window.XMLHttpRequest === 'function') {
      const oXMLHttpRequest = window.XMLHttpRequest
      if (!(window as any).oXMLHttpRequest) {
        // oXMLHttpRequest 为原生的 XMLHttpRequest，可以用以 SDK 进行数据上报，区分业务
        (window as any).oXMLHttpRequest = oXMLHttpRequest
      }
      
      (window as any).XMLHttpRequest = function () {
        // 覆写 window.XMLHttpRequest
        const xhr = new oXMLHttpRequest()
        const { open, send } = xhr
        const breadcrumb: BaseXhrBreadcrumbType = {
          body: '',
          duration: '',
          message: '',
          method: '',
          response: '',
          status: '',
          timestamp: getTimestampValue().toString(),
          traceId: '',
          xhrUrl: '',
          type: BrowserEventTypes.XHR,
          url: window.location.href,
          userAgent: navigator.userAgent
        }
        
        xhr.open = (method, url) => {
          breadcrumb.method = method
          breadcrumb.xhrUrl = url.toString()
          open.call(xhr, method, url, true)
        }
        xhr.send = (body) => {
          breadcrumb.body = (typeof body === 'string' ? body : JSON.stringify(body)) || ''
          send.call(xhr, body)
        }
        xhr.addEventListener('loadend', () => {
          const { status, response } = xhr
          breadcrumb.status = status.toString()
          breadcrumb.response = JSON.stringify(response)
          breadcrumb.traceId = getTraceId(breadcrumb)
          
          if (!(status === 200)) {
            emit(breadcrumb)
          } else {
            if (clientThis.client.options.api) {
              clientThis.client.pushBreadCrumbs(breadcrumb)
            }
          }
        })
        return xhr
      }
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
