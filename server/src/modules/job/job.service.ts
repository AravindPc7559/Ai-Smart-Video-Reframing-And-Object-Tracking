import { JobModel, IJob, IBbox } from './job.model';
import { getR2PublicUrl } from '../../utils/r2/r2.client';

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

export const jobService = {
  async create(input: CreateJobInput): Promise<{ jobId: string; status: JobStatus }> {
    const doc = await JobModel.create({
      videoId: input.videoId,
      bbox: input.bbox,
      ratio: input.ratio,
      status: 'queued',
    });
    return { jobId: (doc as IJob)._id.toString(), status: 'queued' };
  },

  async getById(jobId: string): Promise<JobStatusResult | null> {
    const job = await JobModel.findById(jobId).lean().exec();
    if (!job) return null;
    const result: JobStatusResult = { status: job.status as JobStatus };
    if (job.outputPath) {
      result.outputUrl = getR2PublicUrl(job.outputPath);
    }
    return result;
  },

  async setProcessing(jobId: string): Promise<void> {
    await JobModel.findByIdAndUpdate(jobId, { status: 'processing' }).exec();
  },

  async setCompleted(jobId: string, outputPath: string): Promise<void> {
    await JobModel.findByIdAndUpdate(jobId, { status: 'completed', outputPath }).exec();
  },

  async setFailed(jobId: string): Promise<void> {
    await JobModel.findByIdAndUpdate(jobId, { status: 'failed' }).exec();
  },
};
