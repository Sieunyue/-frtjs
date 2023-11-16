import { BaseClient } from '@trkrjs/core';
import { BaseBreadcrumbType, BaseOptionsType, TransportAuthInfoType } from '@trkrjs/types';
import { BrowserTransport } from './transport';
export interface BrowserOptionsType extends BaseOptionsType {
    getAuthInfo: () => Promise<TransportAuthInfoType>;
}
export declare class BrowserClient extends BaseClient<BrowserOptionsType> {
    transport: BrowserTransport;
    constructor(options: BrowserOptionsType);
    checkOptions(options: BrowserOptionsType): void;
    send(data: BaseBreadcrumbType): void;
}
//# sourceMappingURL=client.d.ts.map