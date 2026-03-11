import { S3Client } from '@aws-sdk/client-s3';
import { env } from '../../config/env';

let client: S3Client | null = null;

function getEndpoint(): string | null {
  const accountId = env.R2_ACCOUNT_ID;
  if (!accountId) return null;
  return `https://${accountId}.r2.cloudflarestorage.com`;
}

export function getR2Client(): S3Client {
  if (client) return client;
  const endpoint = getEndpoint();
  const accessKeyId = env.R2_ACCESS_KEY_ID;
  const secretAccessKey = env.R2_SECRET_ACCESS_KEY;
  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error('R2 is not configured: missing R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, or R2_SECRET_ACCESS_KEY');
  }
  client = new S3Client({
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

export function getR2Bucket(): string {
  const bucket = env.R2_BUCKET_NAME;
  if (!bucket) throw new Error('R2 is not configured: missing R2_BUCKET_NAME');
  return bucket;
}

export function getR2PublicUrl(key: string): string {
  const base = env.R2_PUBLIC_URL;
  if (!base) throw new Error('R2 is not configured: missing R2_PUBLIC_URL');
  const normalized = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${normalized}/${key}`;
}
