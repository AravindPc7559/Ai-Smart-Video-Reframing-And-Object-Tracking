import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getR2Client, getR2Bucket } from './r2.client';

export async function deleteFromR2(key: string): Promise<void> {
  const client = getR2Client();
  const bucket = getR2Bucket();
  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    })
  );
}
