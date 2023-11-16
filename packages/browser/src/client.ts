import { BaseClient } from '@frtjs/core'
import { BaseBreadcrumbType, BaseOptionsType } from '@frtjs/types'
import { BrowserTransport } from './transport'

export interface BrowserOptionsType extends BaseOptionsType {

}
export class BrowserClient extends BaseClient<BrowserOptionsType> {
  transport: BrowserTransport
  constructor(options: BrowserOptionsType) {
    super(options)
    
    this.transport = new BrowserTransport(this)
  }
  
  send(data: BaseBreadcrumbType){
    console.log(data)
  }
}
