import { BaseTransportDataType } from '@frtjs/types'
import { BaseClient, BaseTransport } from '@frtjs/core'
export class BrowserTransport extends BaseTransport {
  constructor(client: BaseClient) {
    super(client)
  }
  
  sendToServer(data: BaseTransportDataType): void {
    const send = typeof navigator.sendBeacon === 'function' ? this.sendByBeacon() : this.sendByXml()
    
    send(data)
  }
  
  sendByXml() {
    return (data: BaseTransportDataType) => {
      const xhr = new (window as any).oXMLHttpRequest()
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.open('POST', this.client.options.dsn!, true)
      xhr.send(JSON.stringify(data))
    }
  }
  
  sendByBeacon() {
    return (data: BaseTransportDataType) => {
      const headers = {
        type: 'application/json',
      }
      const status = window.navigator.sendBeacon(this.client.options.dsn!, new Blob([JSON.stringify(data)], headers))
      if (!status) this.sendByXml().apply(this, [data])
    }
  }
}
