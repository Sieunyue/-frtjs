import { BaseBreadcrumbType, BaseOptionsType } from '@frtjs/types';
import { TransportCategory } from '@frtjs/comm';
export declare abstract class BaseTransport<O extends BaseOptionsType = BaseOptionsType> {
    options: O;
    constructor(options: O);
    /**
     * 发送数据到服务端
     */
    send(category: TransportCategory, data: BaseBreadcrumbType | BaseBreadcrumbType[]): Promise<void>;
    abstract sendToServer(data: any): void;
}
//# sourceMappingURL=transport.d.ts.map