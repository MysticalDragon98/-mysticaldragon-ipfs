const Ipfs = require("ipfs");

export interface IPFSOptions {
    dir: string;
}

export class IPFS {

    ipfs: any;

    constructor (private options: IPFSOptions) {
        
    }

    async init () {
        this.ipfs = await Ipfs.create({ repo: this.options.dir });
    }

    async add (data: any) {
        const { path } = await this.ipfs.add(JSON.stringify(data));

        return path;
    }

    async get (hash: string) {
        const stream = this.ipfs.cat(hash)
        let data = ''

        for await (const chunk of stream) {
            data += chunk.toString()
        }

        return JSON.parse(data);
    }

}