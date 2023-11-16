import { BaseClient } from '@frtjs/core';
import { BaseBreadcrumbType, BaseOptionsType } from '@frtjs/types';
import { BrowserTransport } from './transport';
export interface BrowserOptionsType extends BaseOptionsType {
}
export declare class BrowserClient extends BaseClient<BrowserOptionsType> {
    transport: BrowserTransport;
    constructor(options: BrowserOptionsType);
    send(data: BaseBreadcrumbType): void;
}
//# sourceMappingURL=client.d.ts.map