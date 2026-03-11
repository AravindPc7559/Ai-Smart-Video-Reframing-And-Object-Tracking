import { Queue } from 'bullmq';
import { env } from '../config/env';

const connection = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  ...(env.REDIS_PASSWORD && { password: env.REDIS_PASSWORD }),
};

export interface VideoProcessingPayload {
  jobId: string;
  videoId: string;
  videoPath: string;
  bbox: [number, number, number, number];
  ratio: string;
}

export const videoProcessingQueue = new Queue<VideoProcessingPayload>('video-processing', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 },
    removeOnComplete: 100,
  },
});

export const VIDEO_PROCESSING_JOB_NAME = 'process-video';
