import { Queue } from 'bullmq';
export interface VideoProcessingPayload {
    jobId: string;
    videoId: string;
    videoPath: string;
    bbox: [number, number, number, number];
    ratio: string;
}
export declare const videoProcessingQueue: Queue<VideoProcessingPayload, any, string, VideoProcessingPayload, any, string>;
export declare const VIDEO_PROCESSING_JOB_NAME = "process-video";
//# sourceMappingURL=video.queue.d.ts.map