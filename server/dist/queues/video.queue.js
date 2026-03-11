"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIDEO_PROCESSING_JOB_NAME = exports.videoProcessingQueue = void 0;
const bullmq_1 = require("bullmq");
const env_1 = require("../config/env");
const connection = {
    host: env_1.env.REDIS_HOST,
    port: env_1.env.REDIS_PORT,
    ...(env_1.env.REDIS_PASSWORD && { password: env_1.env.REDIS_PASSWORD }),
};
exports.videoProcessingQueue = new bullmq_1.Queue('video-processing', {
    connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 1000 },
        removeOnComplete: 100,
    },
});
exports.VIDEO_PROCESSING_JOB_NAME = 'process-video';
//# sourceMappingURL=video.queue.js.map