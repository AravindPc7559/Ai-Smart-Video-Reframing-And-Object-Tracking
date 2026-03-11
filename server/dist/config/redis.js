"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRedisConnection = exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const env_1 = require("./env");
const logger_1 = require("../utils/logger");
const redisConfig = {
    host: env_1.env.REDIS_HOST,
    port: env_1.env.REDIS_PORT,
    ...(env_1.env.REDIS_PASSWORD && { password: env_1.env.REDIS_PASSWORD }),
    maxRetriesPerRequest: null,
};
exports.redis = new ioredis_1.default(redisConfig);
exports.redis.on('connect', () => {
    logger_1.logger.info('Redis connected');
});
exports.redis.on('error', (err) => {
    logger_1.logger.error({ err }, 'Redis connection error');
});
exports.redis.on('close', () => {
    logger_1.logger.warn('Redis connection closed');
});
const createRedisConnection = () => {
    return new ioredis_1.default(redisConfig);
};
exports.createRedisConnection = createRedisConnection;
//# sourceMappingURL=redis.js.map