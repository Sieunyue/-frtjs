import { EventTypes } from '@trkrjs/comm';
import { BaseBreadcrumbType } from './client';
import { BaseClient } from '@trkrjs/core';
export interface BasePluginType<T extends EventTypes = EventTypes, C extends BaseClient = BaseClient> {
    /**
     * 事件枚举
     */
    name: T;
    trace: (this: C, emit: (data: BaseBreadcrumbType) => void) => void;
    transform?: (this: C, ...args: any[]) => any;
    post?: (this: C, transformedData: any) => void;
}
//# sourceMappingURL=plugin.d.ts.map