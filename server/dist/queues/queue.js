"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = exports.exampleQueue = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = require("../config/redis");
const env_1 = require("../config/env");
const connection = {
    host: env_1.env.REDIS_HOST,
    port: env_1.env.REDIS_PORT,
    ...(env_1.env.REDIS_PASSWORD && { password: env_1.env.REDIS_PASSWORD }),
};
exports.exampleQueue = new bullmq_1.Queue('example', {
    connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 1000 },
        removeOnComplete: 100,
    },
});
const getConnection = () => (0, redis_1.createRedisConnection)();
exports.getConnection = getConnection;
//# sourceMappingURL=queue.js.map