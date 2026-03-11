import { IBbox } from './job.model';
export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed';
export interface CreateJobInput {
    videoId: string;
    bbox: IBbox;
    ratio: string;
}
export interface JobStatusResult {
    status: JobStatus;
    outputUrl?: string;
}
export declare const jobService: {
    create(input: CreateJobInput): Promise<{
        jobId: string;
        status: JobStatus;
    }>;
    getById(jobId: string): Promise<JobStatusResult | null>;
    setProcessing(jobId: string): Promise<void>;
    setCompleted(jobId: string, outputPath: string): Promise<void>;
    setFailed(jobId: string): Promise<void>;
};
//# sourceMappingURL=job.service.d.ts.map