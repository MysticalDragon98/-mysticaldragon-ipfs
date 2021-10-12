export interface IPFSOptions {
    dir: string;
    gateway: {
        host?: string;
        port: number;
    };
}
export declare class IPFS {
    private options;
    ipfs: any;
    constructor(options: IPFSOptions);
    url(path: string, type?: string): string;
    init(): Promise<void>;
    add(data: any, raw?: boolean): Promise<any>;
    get(hash: string, raw?: boolean): Promise<any>;
    runExpress(): Promise<void>;
}
