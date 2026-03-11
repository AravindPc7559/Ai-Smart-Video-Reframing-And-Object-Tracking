import { VideoModel, IVideo } from './video.model';
import { CreateVideoInput, ALLOWED_VIDEO_MIME_TYPES } from './video.types';
import { uploadToR2 } from '../../utils/r2/r2.upload';
import { getR2PublicUrl } from '../../utils/r2/r2.client';

function isAllowedMimeType(mimeType: string): boolean {
  return (ALLOWED_VIDEO_MIME_TYPES as readonly string[]).includes(mimeType);
}

function generateStorageKey(_fileName: string, mimeType: string): string {
  const ext = mimeType === 'video/quicktime' ? 'mov' : mimeType.split('/')[1] ?? 'mp4';
  const unique = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
  return `videos/${unique}.${ext}`;
}

export const videoService = {
  isAllowedMimeType,

  async uploadVideo(
    userId: string,
    file: { buffer: Buffer; originalname: string; mimetype: string; size: number },
    metadata?: { title?: string; description?: string }
  ): Promise<{ id: string; fileUrl: string }> {
    if (!isAllowedMimeType(file.mimetype)) {
      const err = new Error('Invalid file type. Allowed: mp4, mov, webm') as Error & { statusCode?: number };
      err.statusCode = 400;
      throw err;
    }

    const key = generateStorageKey(file.originalname, file.mimetype);
    await uploadToR2({
      key,
      body: file.buffer,
      contentType: file.mimetype,
    });

    const fileUrl = getR2PublicUrl(key);
    const input: CreateVideoInput = {
      title: metadata?.title,
      description: metadata?.description,
      fileName: file.originalname,
      fileUrl,
      fileSize: file.size,
      mimeType: file.mimetype,
      uploadedBy: userId,
    };

    const doc = new VideoModel({
      ...input,
      uploadedBy: input.uploadedBy,
    });
    const saved = await doc.save();
    return { id: (saved as IVideo)._id.toString(), fileUrl };
  },
};
