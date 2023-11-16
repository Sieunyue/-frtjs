import { BaseTransportDataType, TransportAuthInfoType } from '@trkrjs/types';
import { BaseTransport } from '@trkrjs/core';
import { BrowserOptionsType } from './client';
export declare class BrowserTransport extends BaseTransport<BrowserOptionsType> {
    constructor(options: BrowserOptionsType);
    getAuthInfo(): Promise<TransportAuthInfoType>;
    sendToServer(data: BaseTransportDataType): void;
    sendByXml(): (data: BaseTransportDataType) => void;
    sendByBeacon(): (data: BaseTransportDataType) => void;
}
//# sourceMappingURL=transport.d.ts.map