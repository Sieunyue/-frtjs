import { EventTypes } from '@frtjs/comm';
import { BaseOptionsType, BasePluginType } from '@frtjs/types';
import { BaseTransport } from '@frtjs/core';
export interface BaseClientType<O extends BaseOptionsType = BaseOptionsType> {
    breadcrumbs: BaseBreadcrumbType[];
    options: O;
    transport: BaseTransport;
    use: (plugin: BasePluginType) => BaseClientType;
    getOptions: () => O;
    send: (data: any) => void;
    pushBreadCrumbs: (data: BaseBreadcrumbType) => void;
}
export interface BaseBreadcrumbType {
    /**
     * 监控ID
     */
    traceId: string;
    /**
     * 页面地址
     */
    url: string;
    /**
     * 时间戳
     */
    timestamp: string;
    /**
     * 客户端信息
     */
    userAgent: string;
    /**
     * 事件类型
     */
    type: EventTypes;
    /**
     * 事件信息
     */
    message: string;
    /**
     * 附带信息
     */
    meta?: any;
}
export interface BaseJSErrorBreadcrumbType extends BaseBreadcrumbType {
    /**
     * 错误文件名
     */
    filename: string;
    /**
     * 错误类型
     */
    errorType: string;
    /**
     * 错误位置
     */
    position: string;
    /**
     * 错误堆栈
     */
    stack: string;
    /**
     * 错误函数
     */
    functionName: string;
}
export interface BasePromiseBreadcrumbType extends BaseBreadcrumbType {
    stack: string;
    errorType: string;
}
export interface BaseResourceBreadcrumbType extends BaseBreadcrumbType {
    filename: string;
    tagName: string;
    outerHTML: string;
}
export interface BaseXhrBreadcrumbType extends BaseBreadcrumbType {
    status: string;
    duration: string;
    response: string;
    body: string;
    xhrUrl: string;
    method: string;
}
export interface BaseDomBreadcrumbType {
    selector: string;
    action: string;
    value: string;
}
export interface BaseRouterBreadcrumbType {
    form: string;
    to: string;
}
//# sourceMappingURL=client.d.ts.map