import { EventTypes } from '@trkrjs/comm';
import { BaseOptionsType, BasePluginType } from '@trkrjs/types';
import { BaseTransport } from './transport';
export declare abstract class BaseClient<O extends BaseOptionsType = BaseOptionsType, E extends EventTypes = EventTypes> {
    SDK_NAME: string;
    SDK_VERSION: string;
    private _subscribe;
    options: O;
    abstract transport: BaseTransport;
    constructor(options: O);
    use(plugin: BasePluginType<E>): this;
    getOptions(): O;
    abstract send(data: any): void;
}
//# sourceMappingURL=client.d.ts.map