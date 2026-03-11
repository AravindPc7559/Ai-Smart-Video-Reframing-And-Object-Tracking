"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProcessVideoJob = void 0;
const video_queue_1 = require("../video.queue");
const addProcessVideoJob = async (data) => {
    const job = await video_queue_1.videoProcessingQueue.add(video_queue_1.VIDEO_PROCESSING_JOB_NAME, data);
    return job.id;
};
exports.addProcessVideoJob = addProcessVideoJob;
//# sourceMappingURL=video.job.js.map