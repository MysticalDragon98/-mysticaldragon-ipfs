export interface IPFSOptions {
    dir: string;
}
export declare class IPFS {
    private options;
    ipfs: any;
    constructor(options: IPFSOptions);
    init(): Promise<void>;
    add(data: any): Promise<any>;
    get(hash: string): Promise<any>;
}
