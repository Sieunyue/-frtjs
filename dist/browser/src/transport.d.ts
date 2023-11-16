import { BaseTransportDataType } from '@frtjs/types';
import { BaseTransport } from '@frtjs/core';
import { BrowserOptionsType } from './client';
export declare class BrowserTransport extends BaseTransport<BrowserOptionsType> {
    constructor(options: BrowserOptionsType);
    sendToServer(data: BaseTransportDataType): void;
    sendByXml(): (data: BaseTransportDataType) => void;
    sendByBeacon(): (data: BaseTransportDataType) => void;
}
//# sourceMappingURL=transport.d.ts.map