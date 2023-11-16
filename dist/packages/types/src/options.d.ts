export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';
export interface BaseOptionsType {
    /**
     * 接口地址
     */
    dsn?: string;
    /**
     * 是否启用
     */
    disabled?: boolean;
    /**
     * 最大Breadcrumbs
     * @default 20
     */
    maxBreadcrumbs?: number;
    /**
     * 过滤xhr请求
     */
    excludeXhrUrl?: RegExp[];
}
//# sourceMappingURL=options.d.ts.map