"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getR2Client = getR2Client;
exports.getR2Bucket = getR2Bucket;
exports.getR2PublicUrl = getR2PublicUrl;
const client_s3_1 = require("@aws-sdk/client-s3");
const env_1 = require("../../config/env");
let client = null;
function getEndpoint() {
    const accountId = env_1.env.R2_ACCOUNT_ID;
    if (!accountId)
        return null;
    return `https://${accountId}.r2.cloudflarestorage.com`;
}
function getR2Client() {
    if (client)
        return client;
    const endpoint = getEndpoint();
    const accessKeyId = env_1.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = env_1.env.R2_SECRET_ACCESS_KEY;
    if (!endpoint || !accessKeyId || !secretAccessKey) {
        throw new Error('R2 is not configured: missing R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, or R2_SECRET_ACCESS_KEY');
    }
    client = new client_s3_1.S3Client({
        region: 'auto',
        endpoint,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
        forcePathStyle: true,
    });
    return client;
}
function getR2Bucket() {
    const bucket = env_1.env.R2_BUCKET_NAME;
    if (!bucket)
        throw new Error('R2 is not configured: missing R2_BUCKET_NAME');
    return bucket;
}
function getR2PublicUrl(key) {
    const base = env_1.env.R2_PUBLIC_URL;
    if (!base)
        throw new Error('R2 is not configured: missing R2_PUBLIC_URL');
    const normalized = base.endsWith('/') ? base.slice(0, -1) : base;
    return `${normalized}/${key}`;
}
//# sourceMappingURL=r2.client.js.map