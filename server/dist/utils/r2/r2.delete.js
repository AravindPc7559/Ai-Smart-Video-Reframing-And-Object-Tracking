"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromR2 = deleteFromR2;
const client_s3_1 = require("@aws-sdk/client-s3");
const r2_client_1 = require("./r2.client");
async function deleteFromR2(key) {
    const client = (0, r2_client_1.getR2Client)();
    const bucket = (0, r2_client_1.getR2Bucket)();
    await client.send(new client_s3_1.DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
    }));
}
//# sourceMappingURL=r2.delete.js.map