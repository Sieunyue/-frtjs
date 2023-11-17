import { EventTypes } from './constant'
import { BaseBreadcrumbType, BaseClientType } from './client'

export interface BasePluginType<C extends BaseClientType = BaseClientType> {
  /**
   * 事件枚举
   */
  name: EventTypes,
  client: C
  install: (client: C, emit: (data: BaseBreadcrumbType) => void) => void
  transform?: (...args: any[]) => any
  post?: (transformedData: any) => void
}
