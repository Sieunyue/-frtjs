import { BaseTransportDataType } from '@frtjs/types'
import { BaseTransport } from '@frtjs/core'
import { BrowserOptionsType } from './client'

export class BrowserTransport extends BaseTransport<BrowserOptionsType> {
  constructor(options: BrowserOptionsType) {
    super(options)
  }
  
  sendToServer(data: BaseTransportDataType): void {
    const send = typeof navigator.sendBeacon === 'function' ? this.sendByBeacon() : this.sendByXml()
    
    send(data)
  }
  
  sendByXml() {
    return (data: BaseTransportDataType) => {
      console.log(123)
      const xhr = new (window as any).oXMLHttpRequest()
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.open('POST', this.options.dsn!, true)
      xhr.send(JSON.stringify(data))
    }
  }
  
  sendByBeacon() {
    return (data: BaseTransportDataType) => {
      const headers = {
        type: 'application/json',
      }
      const status = window.navigator.sendBeacon(this.options.dsn!, new Blob([JSON.stringify(data)], headers))
      console.log('Beacon status', status)
      if (!status) this.sendByXml().apply(this, [data])
    }
  }
}
