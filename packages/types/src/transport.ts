import { BaseBreadcrumbType, BaseClientType } from './client'
import { TransportCategory } from './constant'

export interface BaseTransportType<C extends BaseClientType = BaseClientType> {
  client: C
  send: (category: TransportCategory, data: BaseBreadcrumbType | BaseBreadcrumbType[]) => void
  sendToServer: (data: any) => void
}

export interface TransportAuthInfoType {
  [key: string]: any
}

export type BaseTransportDataType<D extends BaseBreadcrumbType = BaseBreadcrumbType, T extends TransportAuthInfoType = TransportAuthInfoType> =
  {
    [key in keyof T]: T[keyof T]
  }
  & {
  category: TransportCategory
  sdkVersion: string
  sdkName: string
  context?: D
  contexts?: D[]
}
