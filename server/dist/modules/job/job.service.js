"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobService = void 0;
const job_model_1 = require("./job.model");
const r2_client_1 = require("../../utils/r2/r2.client");
exports.jobService = {
    async create(input) {
        const doc = await job_model_1.JobModel.create({
            videoId: input.videoId,
            bbox: input.bbox,
            ratio: input.ratio,
            status: 'queued',
        });
        return { jobId: doc._id.toString(), status: 'queued' };
    },
    async getById(jobId) {
        const job = await job_model_1.JobModel.findById(jobId).lean().exec();
        if (!job)
            return null;
        const result = { status: job.status };
        if (job.outputPath) {
            result.outputUrl = (0, r2_client_1.getR2PublicUrl)(job.outputPath);
        }
        return result;
    },
    async setProcessing(jobId) {
        await job_model_1.JobModel.findByIdAndUpdate(jobId, { status: 'processing' }).exec();
    },
    async setCompleted(jobId, outputPath) {
        await job_model_1.JobModel.findByIdAndUpdate(jobId, { status: 'completed', outputPath }).exec();
    },
    async setFailed(jobId) {
        await job_model_1.JobModel.findByIdAndUpdate(jobId, { status: 'failed' }).exec();
    },
};
//# sourceMappingURL=job.service.js.map