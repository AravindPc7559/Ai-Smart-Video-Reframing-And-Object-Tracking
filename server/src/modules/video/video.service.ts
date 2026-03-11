import { VideoModel, IVideo } from './video.model';
import { CreateVideoInput, PROCESSING_RATIOS, ProcessVideoInput } from './video.types';
import { uploadToR2 } from '../../utils/r2/r2.upload';
import { getR2PublicUrl } from '../../utils/r2/r2.client';
import { jobService } from '../job/job.service';
import { addProcessVideoJob } from '../../queues/jobs/video.job';
import { AppError } from '../../middlewares/error.middleware';
import { isAllowedMimeType, generateStorageKey } from './video.utils';

export const videoService = {
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
      storagePath: key,
      status: 'uploaded',
    });
    const saved = await doc.save();
    return { id: (saved as IVideo)._id.toString(), fileUrl };
  },

  async requestProcessing(input: ProcessVideoInput): Promise<{ jobId: string; status: 'queued' }> {
    const video = await VideoModel.findById(input.videoId).lean().exec();
    if (!video) {
      const err = new Error('Video not found') as AppError;
      err.statusCode = 404;
      throw err;
    }
    const storagePath = (video as { storagePath?: string }).storagePath;
    if (!storagePath) {
      const err = new Error('Video storage path not found') as AppError;
      err.statusCode = 400;
      throw err;
    }
    const { jobId } = await jobService.create({
      videoId: input.videoId,
      bbox: input.bbox,
      ratio: input.ratio,
    });
    const bboxArr: [number, number, number, number] = [
      input.bbox.x,
      input.bbox.y,
      input.bbox.width,
      input.bbox.height,
    ];
    await addProcessVideoJob({
      jobId,
      videoId: input.videoId,
      videoPath: storagePath,
      bbox: bboxArr,
      ratio: input.ratio,
    });
    return { jobId, status: 'queued' as const };
  },

  async setProcessed(videoId: string, outputPath: string): Promise<void> {
    await VideoModel.findByIdAndUpdate(videoId, {
      status: 'processed',
      processedVideo: outputPath,
    }).exec();
  },
};

export function isAllowedRatio(ratio: string): boolean {
  return (PROCESSING_RATIOS as readonly string[]).includes(ratio);
}
