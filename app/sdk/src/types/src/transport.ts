import { BaseBreadcrumbType, TransportCategory } from '../'

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
