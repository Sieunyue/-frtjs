import { BaseTransportDataType } from '@frtjs/types';
import { BaseClient, BaseTransport } from '@frtjs/core';
export declare class BrowserTransport extends BaseTransport {
    constructor(client: BaseClient);
    sendToServer(data: BaseTransportDataType): void;
    sendByXml(): (data: BaseTransportDataType) => void;
    sendByBeacon(): (data: BaseTransportDataType) => void;
}
//# sourceMappingURL=transport.d.ts.map