import { BaseClient } from '@/core'
import { BaseOptionsType, BaseTransportDataType } from '@/types'

export interface BrowserOptionsType extends BaseOptionsType {
  api?: boolean
}

export class BrowserClient extends BaseClient<BrowserOptionsType> {
  constructor(options: BrowserOptionsType) {
    super(options)
  }
  
  async send(data: BaseTransportDataType) {
    const func = typeof navigator.sendBeacon === 'function' ? this.sendByBeacon() : this.sendByXml()
    
    func(data)
  }
  
  sendByXml() {
    return (data: BaseTransportDataType) => {
      const xhr = new (window as any).oXMLHttpRequest()
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.open('POST', this.options.dsn!, true)
      xhr.send(JSON.stringify(data))
    }
  }
  
  sendByBeacon() {
    return (data: BaseTransportDataType) => {
      const headers = {
        type: 'application/json'
      }
      const status = window.navigator.sendBeacon(this.options.dsn!, new Blob([JSON.stringify(data)], headers))
      if (!status) this.sendByXml().apply(this, [data])
    }
  }
}
