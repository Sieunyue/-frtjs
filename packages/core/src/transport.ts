import { BaseBreadcrumbType, BaseClientType, BaseOptionsType } from '@frtjs/types'
import { BaseTransportDataType } from '@frtjs/types/src/transport'
import { SDK_NAME, SDK_VERSION, TransportCategory } from '@frtjs/comm'

export abstract class BaseTransport<C extends BaseClientType = BaseClientType> {
  client: C
  constructor(client: C) {
    this.client = client
  }
  /**
   * 发送数据到服务端
   */
  async send(category: TransportCategory, data: BaseBreadcrumbType | BaseBreadcrumbType[]): Promise<void> {
    if(!this.client.options.dsn){
      return
    }
    
    const authInfo = await this.client.options.getAuthInfo()
    const transformData: BaseTransportDataType = {
      ...authInfo,
      category,
      sdkName: SDK_NAME,
      sdkVersion: SDK_VERSION,
    }
    
    if(Array.isArray(data)){
      transformData.contexts = data
    }else{
      transformData.context = data
    }
    
    return this.sendToServer(transformData)
  }
  
  abstract sendToServer(data: any): void
}
