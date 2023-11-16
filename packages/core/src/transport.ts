import { BaseBreadcrumbType, BaseOptionsType } from '@frtjs/types'
import { BaseTransportDataType } from '@frtjs/types/src/transport'
import { SDK_NAME, SDK_VERSION, TransportCategory } from '@frtjs/comm'

export abstract class BaseTransport<O extends BaseOptionsType = BaseOptionsType> {
  options: O
  constructor(options: O) {
    this.options = options
  }
  /**
   * 发送数据到服务端
   */
  async send(category: TransportCategory, data: BaseBreadcrumbType | BaseBreadcrumbType[]): Promise<void> {
    if(!this.options.dsn){
      return
    }
    
    const authInfo = await this.options.getAuthInfo()
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
