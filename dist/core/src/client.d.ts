import { BaseClientType, BaseOptionsType, BasePluginType } from '@frtjs/types';
import { BaseTransport } from './transport';
export declare abstract class BaseClient<O extends BaseOptionsType = BaseOptionsType> implements BaseClientType<O> {
    SDK_NAME: string;
    SDK_VERSION: string;
    private _subscribe;
    options: O;
    abstract transport: BaseTransport;
    constructor(options: O);
    use(plugin: BasePluginType): this;
    getOptions(): O;
    abstract send(data: any): void;
}
//# sourceMappingURL=client.d.ts.map