"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideoWorker = createVideoWorker;
const bullmq_1 = require("bullmq");
const env_1 = require("../../config/env");
const logger_1 = require("../../utils/logger");
const job_service_1 = require("../../modules/job/job.service");
const video_service_1 = require("../../modules/video/video.service");
const r2_upload_1 = require("../../utils/r2/r2.upload");
const connection = {
    host: env_1.env.REDIS_HOST,
    port: env_1.env.REDIS_PORT,
    ...(env_1.env.REDIS_PASSWORD && { password: env_1.env.REDIS_PASSWORD }),
};
function mockAIService(payload) {
    return Promise.resolve({
        outputPath: `videos/processed/${payload.videoId}_vertical.mp4`,
    });
}
function createVideoWorker() {
    const worker = new bullmq_1.Worker('video-processing', async (job) => {
        const data = job.data;
        await job_service_1.jobService.setProcessing(data.jobId);
        const mockResponse = await mockAIService(data);
        const outputPath = mockResponse.outputPath;
        try {
            const placeholder = Buffer.alloc(0);
            await (0, r2_upload_1.uploadToR2)({
                key: outputPath,
                body: placeholder,
                contentType: 'video/mp4',
            });
        }
        catch (r2Err) {
            logger_1.logger.warn({ err: r2Err, outputPath }, 'R2 upload skipped or failed');
        }
        await video_service_1.videoService.setProcessed(data.videoId, outputPath);
        await job_service_1.jobService.setCompleted(data.jobId, outputPath);
        return { outputPath };
    }, { connection });
    worker.on('completed', (job) => {
        logger_1.logger.info({ jobId: job?.id }, 'Video processing job completed');
    });
    worker.on('failed', (job, err) => {
        logger_1.logger.error({ jobId: job?.id, err }, 'Video processing job failed');
        if (job?.data?.jobId) {
            job_service_1.jobService.setFailed(job.data.jobId).catch((e) => logger_1.logger.error({ err: e }, 'Failed to set job failed'));
        }
    });
    return worker;
}
//# sourceMappingURL=video.worker.js.map