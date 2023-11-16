import { BaseBreadcrumbType, BaseClientType, BaseOptionsType, BasePluginType } from '@frtjs/types';
import { BaseTransport } from './transport';
export declare abstract class BaseClient<O extends BaseOptionsType = BaseOptionsType> implements BaseClientType<O> {
    SDK_NAME: string;
    SDK_VERSION: string;
    private _subscribe;
    options: O;
    breadcrumbs: BaseBreadcrumbType[];
    abstract transport: BaseTransport;
    constructor(options?: {});
    use(plugin: BasePluginType): this;
    pushBreadCrumbs(data: BaseBreadcrumbType): Promise<void>;
    getOptions(): O;
    abstract send(data: any): void;
}
//# sourceMappingURL=client.d.ts.map