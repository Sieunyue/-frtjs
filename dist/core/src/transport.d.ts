import { BaseBreadcrumbType, BaseClientType } from '@frtjs/types';
import { TransportCategory } from '@frtjs/comm';
export declare abstract class BaseTransport<C extends BaseClientType = BaseClientType> {
    client: C;
    constructor(client: C);
    /**
     * 发送数据到服务端
     */
    send(category: TransportCategory, data: BaseBreadcrumbType | BaseBreadcrumbType[]): Promise<void>;
    abstract sendToServer(data: any): void;
}
//# sourceMappingURL=transport.d.ts.map