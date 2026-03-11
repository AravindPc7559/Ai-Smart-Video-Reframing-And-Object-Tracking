import { Worker, Job } from 'bullmq';
import { env } from '../../config/env';
import { logger } from '../../utils/logger';
import { VideoProcessingPayload } from '../jobs/video.job';
import { jobService } from '../../modules/job/job.service';
import { videoService } from '../../modules/video/video.service';
import { uploadToR2 } from '../../utils/r2/r2.upload';

const connection = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  ...(env.REDIS_PASSWORD && { password: env.REDIS_PASSWORD }),
};

interface MockAIResponse {
  outputPath: string;
}

function mockAIService(payload: VideoProcessingPayload): Promise<MockAIResponse> {
  return Promise.resolve({
    outputPath: `videos/processed/${payload.videoId}_vertical.mp4`,
  });
}

export function createVideoWorker(): Worker<VideoProcessingPayload> {
  const worker = new Worker<VideoProcessingPayload>(
    'video-processing',
    async (job: Job<VideoProcessingPayload>) => {
      const data = job.data;
      await jobService.setProcessing(data.jobId);
      const mockResponse = await mockAIService(data);
      const outputPath = mockResponse.outputPath;
      try {
        const placeholder = Buffer.alloc(0);
        await uploadToR2({
          key: outputPath,
          body: placeholder,
          contentType: 'video/mp4',
        });
      } catch (r2Err) {
        logger.warn({ err: r2Err, outputPath }, 'R2 upload skipped or failed');
      }
      await videoService.setProcessed(data.videoId, outputPath);
      await jobService.setCompleted(data.jobId, outputPath);
      return { outputPath };
    },
    { connection }
  );

  worker.on('completed', (job) => {
    logger.info({ jobId: job?.id }, 'Video processing job completed');
  });

  worker.on('failed', (job, err) => {
    logger.error({ jobId: job?.id, err }, 'Video processing job failed');
    if (job?.data?.jobId) {
      jobService.setFailed(job.data.jobId).catch((e) => logger.error({ err: e }, 'Failed to set job failed'));
    }
  });

  return worker;
}
