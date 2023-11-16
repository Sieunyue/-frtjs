import { BaseBreadcrumbType, BaseOptionsType } from '@trkrjs/types';
import { TransportAuthInfoType } from '@trkrjs/types/src/transport';
import { TransportCategory } from '@trkrjs/comm';
export declare abstract class BaseTransport<O extends BaseOptionsType = BaseOptionsType> {
    options: O;
    constructor(options: O);
    /**
     * 发送数据到服务端
     */
    send(category: TransportCategory, data: BaseBreadcrumbType | BaseBreadcrumbType[]): Promise<void>;
    abstract sendToServer(data: any): void;
    abstract getAuthInfo(): Promise<TransportAuthInfoType>;
}
//# sourceMappingURL=transport.d.ts.map