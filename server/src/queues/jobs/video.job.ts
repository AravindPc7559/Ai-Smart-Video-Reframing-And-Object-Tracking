import { videoProcessingQueue, VIDEO_PROCESSING_JOB_NAME, VideoProcessingPayload } from '../video.queue';

export type { VideoProcessingPayload };

export const addProcessVideoJob = async (data: VideoProcessingPayload): Promise<string | undefined> => {
  const job = await videoProcessingQueue.add(VIDEO_PROCESSING_JOB_NAME, data);
  return job.id;
};
