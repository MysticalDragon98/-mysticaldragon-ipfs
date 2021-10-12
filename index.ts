import { createServer } from "http";
const Ipfs = require("ipfs");

export interface IPFSOptions {
    dir: string;
    gateway: { host?: string, port: number }
}

export class IPFS {

    ipfs: any;

    constructor (private options: IPFSOptions) {

    }

    url (path: string, type?: string) {
        if (type) type = "." + type;

        return `http://${this.options.gateway.host}:${this.options.gateway.port}/ipfs/` + path + type
    }

    async init () {
        this.ipfs = await Ipfs.create({ repo: this.options.dir });

        await this.runExpress();
    }

    async add (data: any, raw: boolean=false) {
        const { path } = await this.ipfs.add(raw? data : JSON.stringify(data));

        return path;
    }

    async get (hash: string, raw: boolean=false) {
        const stream = this.ipfs.cat(hash)
        let data = ''

        for await (const chunk of stream) {
            data += chunk.toString()
        }

        return raw? data : JSON.parse(data);
    }

    async runExpress () {
        const { host, port } = this.options.gateway!;

        const app = createServer(async (rq, rs) => {
            const { url } = rq;

            if (!url || !url.startsWith("/ipfs/")) {
                rs.statusCode = 404;
                rs.end("Not Found.");
                return;
            }

            try {
                const cid = url.substring(6, url.includes(".")? url.indexOf(".") : url.length);
    
                rs.statusCode = 200;
                rs.end(await this.get(cid, true));
            } catch (exc) {
                rs.statusCode = 500;
                rs.end((<any>exc).message);

                console.log(exc);
            }
        });

        return new Promise<void>(resolve => app.listen(port, () => {
            resolve();
        }))
    }

}