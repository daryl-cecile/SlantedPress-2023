import { S3 } from "@aws-sdk/client-s3";
import { Agent } from "https";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";

const s3 = new S3({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID as string}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
    },
    requestHandler: new NodeHttpHandler({
        httpsAgent: new Agent({
            maxSockets: 500,
            keepAlive: true,
            keepAliveMsecs: 1000
        }),
        socketTimeout: 5000,
        requestTimeout: 5000
    })
});

export default s3;

export namespace storage {

    export async function get(path:string){
        return s3.getObject({
            Bucket: 'slantedpress',
            Key: path
        });
    }

}