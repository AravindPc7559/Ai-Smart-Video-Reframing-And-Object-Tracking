import { ProcessVideoInput } from './video.types';
export declare const videoService: {
    uploadVideo(userId: string, file: {
        buffer: Buffer;
        originalname: string;
        mimetype: string;
        size: number;
    }, metadata?: {
        title?: string;
        description?: string;
    }): Promise<{
        id: string;
        fileUrl: string;
    }>;
    requestProcessing(input: ProcessVideoInput): Promise<{
        jobId: string;
        status: "queued";
    }>;
    setProcessed(videoId: string, outputPath: string): Promise<void>;
};
export declare function isAllowedRatio(ratio: string): boolean;
//# sourceMappingURL=video.service.d.ts.map