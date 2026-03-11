"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const logger_1 = require("./utils/logger");
const example_worker_1 = require("./queues/workers/example.worker");
const video_worker_1 = require("./queues/workers/video.worker");
const start = async () => {
    await (0, db_1.connectDb)();
    (0, example_worker_1.createExampleWorker)();
    (0, video_worker_1.createVideoWorker)();
    app_1.default.listen(env_1.env.PORT, () => {
        logger_1.logger.info({ port: env_1.env.PORT }, 'Server started');
    });
};
start().catch((err) => {
    logger_1.logger.error({ err }, 'Failed to start server');
    process.exit(1);
});
//# sourceMappingURL=server.js.map