"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToR2 = uploadToR2;
const client_s3_1 = require("@aws-sdk/client-s3");
const r2_client_1 = require("./r2.client");
async function uploadToR2(input) {
    const client = (0, r2_client_1.getR2Client)();
    const bucket = (0, r2_client_1.getR2Bucket)();
    await client.send(new client_s3_1.PutObjectCommand({
        Bucket: bucket,
        Key: input.key,
        Body: input.body,
        ContentType: input.contentType,
    }));
}
//# sourceMappingURL=r2.upload.js.map