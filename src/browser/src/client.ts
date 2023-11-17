import { BaseClient } from '@/core'
import { BaseClientType, BaseOptionsType, BaseTransportDataType } from '@/types'

export interface BrowserOptionsType extends BaseOptionsType {
  api?: boolean
}

export type BrowserClientType = BaseClientType<BrowserOptionsType>

export class BrowserClient extends BaseClient {
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
      
      let headers: Record<string, any> = {}
      
      if(this.options.headers){
        if(typeof this.options.headers === 'function'){
          headers = this.options.headers()
        }else{
          headers = this.options.headers
        }
        
        for (const header of Object.keys(headers)) {
          xhr.setRequestHeader(header, headers[header])
        }
      }
      
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
