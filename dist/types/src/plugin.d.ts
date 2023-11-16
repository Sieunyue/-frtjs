import { EventTypes } from '@frtjs/comm';
import { BaseBreadcrumbType, BaseClientType } from './client';
export interface BasePluginType<C extends BaseClientType = BaseClientType> {
    /**
     * 事件枚举
     */
    name: EventTypes;
    trace: (this: C, emit: (data: BaseBreadcrumbType) => void) => void;
    transform?: (this: C, ...args: any[]) => any;
    post?: (this: C, transformedData: any) => void;
}
//# sourceMappingURL=plugin.d.ts.map