import { BaseTransport, BaseClient } from '@frtjs/core';
import { BaseTransportDataType, BaseOptionsType, BaseBreadcrumbType } from '@frtjs/types';

declare class BrowserTransport extends BaseTransport<BrowserOptionsType> {
    constructor(options: BrowserOptionsType);
    sendToServer(data: BaseTransportDataType): void;
    sendByXml(): (data: BaseTransportDataType) => void;
    sendByBeacon(): (data: BaseTransportDataType) => void;
}

interface BrowserOptionsType extends BaseOptionsType {
}
declare class BrowserClient extends BaseClient<BrowserOptionsType> {
    transport: BrowserTransport;
    constructor(options: BrowserOptionsType);
    send(data: BaseBreadcrumbType): void;
}

declare const frtjs: {
    init: (options: BrowserOptionsType) => BrowserClient;
};

export { frtjs as default };
