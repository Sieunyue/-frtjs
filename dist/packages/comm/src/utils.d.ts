export declare function parseStackLine(line: string): {
    filename?: undefined;
    functionName?: undefined;
    lineno?: undefined;
    colno?: undefined;
} | {
    filename: string;
    functionName: string;
    lineno: number | undefined;
    colno: number | undefined;
};
export declare function parseStackFrames(error: Error, maxDepth?: number): ({
    filename?: undefined;
    functionName?: undefined;
    lineno?: undefined;
    colno?: undefined;
} | {
    filename: string;
    functionName: string;
    lineno: number | undefined;
    colno: number | undefined;
})[];
export declare const isJsError: (e: ErrorEvent | Event) => boolean;
export declare const isResourceError: (e: ErrorEvent | Event) => boolean;
//# sourceMappingURL=utils.d.ts.map