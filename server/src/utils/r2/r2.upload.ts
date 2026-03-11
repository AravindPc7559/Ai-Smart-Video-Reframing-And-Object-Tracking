import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getR2Client, getR2Bucket } from './r2.client';

export interface UploadToR2Input {
  key: string;
  body: Buffer;
  contentType: string;
}

export async function uploadToR2(input: UploadToR2Input): Promise<void> {
  const client = getR2Client();
  const bucket = getR2Bucket();
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: input.key,
      Body: input.body,
      ContentType: input.contentType,
    })
  );
}
