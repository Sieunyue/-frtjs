import { EventTypes, SDK_NAME, SDK_VERSION } from '@frtjs/comm'
import { BaseClientType, BaseOptionsType, BasePluginType } from '@frtjs/types'
import mitt, { Emitter } from 'mitt'
import { BaseTransport } from './transport'

export abstract class BaseClient<O extends BaseOptionsType = BaseOptionsType> implements BaseClientType<O> {
  SDK_NAME = SDK_NAME
  SDK_VERSION = SDK_VERSION
  private _subscribe: Emitter<Record<EventTypes, any>>
  options: O
  abstract transport: BaseTransport
  
  constructor(options: O) {
    this.options = options
    this._subscribe = mitt()
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
  
  // use(plugin) {
  //   // plugin.trace.call(this, this._subscribe.emit.bind(this, plugin.name))
  //   //
  //   // // this._plugins.push(plugin)
  //   // const wrapperTransform = (...args: any[]) => {
  //   //   // 先执行transform
  //   //   const res = plugin.transform?.apply(this, args)
  //   //   // 拿到transform返回的数据并传入
  //   //   plugin.post?.call(this, res)
  //   // }
  //   //
  //   // this._subscribe.on(plugin.name, wrapperTransform)
  //   // return this
  // }
  
  getOptions() {
    return this.options
  }
  
  abstract send(data: any): void
}
