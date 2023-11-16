import { SDK_NAME, SDK_VERSION } from '@/comm'
import { BaseBreadcrumbType, BaseClientType, BaseOptionsType, BasePluginType, BaseTransportDataType, EventTypes, TransportCategory } from '@/types'
import mitt, { Emitter } from 'mitt'

export abstract class BaseClient<O extends BaseOptionsType = BaseOptionsType> implements BaseClientType<O> {
  SDK_NAME = SDK_NAME
  SDK_VERSION = SDK_VERSION
  private _subscribe: Emitter<Record<EventTypes, any>>
  options: O
  breadcrumbs: BaseBreadcrumbType[]
  
  constructor(options = {}) {
    this.options = Object.assign({ maxBreadcrumbs: 20 }, options) as O
    this._subscribe = mitt()
    this.breadcrumbs = []
  }
  
  use(plugin: BasePluginType) {
    plugin.trace.call(this, this._subscribe.emit.bind(this, plugin.name))
    
    // this._plugins.push(plugin)
    const wrapperTransform = (...args: any[]) => {
      // 先执行transform
      const res = plugin.transform?.apply(this, args)
      // 拿到transform返回的数据并传入
      plugin.post?.call(this, res)
    }
    
    this._subscribe.on(plugin.name, wrapperTransform)
    return this
  }
  
  async pushBreadCrumbs(data: BaseBreadcrumbType) {
    this.breadcrumbs.push(data)
    
    if (this.breadcrumbs.length >= this.options.maxBreadcrumbs!) {
      const data = await this.transform(TransportCategory.API, [...this.breadcrumbs])
      this.send(data).then()
      this.breadcrumbs.length = 0
    }
  }
  
  getOptions() {
    return this.options
  }
  
  
  async transform(category: TransportCategory, data: BaseBreadcrumbType | BaseBreadcrumbType[] | undefined) {
    const authInfo = await this.options.getAuthInfo()
    const transformData: BaseTransportDataType = {
      ...authInfo,
      category,
      sdkName: SDK_NAME,
      sdkVersion: SDK_VERSION
    }
    
    if (Array.isArray(data)) {
      transformData.contexts = data
    } else {
      transformData.context = data
    }
    
    return transformData
  }
  
  abstract send(data: BaseTransportDataType): Promise<void>
  
  
}
