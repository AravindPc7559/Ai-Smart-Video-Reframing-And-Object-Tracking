"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExampleWorker = void 0;
const bullmq_1 = require("bullmq");
const env_1 = require("../../config/env");
const logger_1 = require("../../utils/logger");
const connection = {
    host: env_1.env.REDIS_HOST,
    port: env_1.env.REDIS_PORT,
    ...(env_1.env.REDIS_PASSWORD && { password: env_1.env.REDIS_PASSWORD }),
};
const createExampleWorker = () => {
    const worker = new bullmq_1.Worker('example', async (job) => {
        logger_1.logger.info({ jobId: job.id, data: job.data }, 'Processing example job');
        return { processed: true, message: job.data.message };
    }, { connection });
    worker.on('completed', (job) => {
        logger_1.logger.info({ jobId: job.id }, 'Example job completed');
    });
    worker.on('failed', (job, err) => {
        logger_1.logger.error({ jobId: job?.id, err }, 'Example job failed');
    });
    return worker;
};
exports.createExampleWorker = createExampleWorker;
//# sourceMappingURL=example.worker.js.map