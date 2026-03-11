"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoService = void 0;
exports.isAllowedRatio = isAllowedRatio;
const video_model_1 = require("./video.model");
const video_types_1 = require("./video.types");
const r2_upload_1 = require("../../utils/r2/r2.upload");
const r2_client_1 = require("../../utils/r2/r2.client");
const job_service_1 = require("../job/job.service");
const video_job_1 = require("../../queues/jobs/video.job");
const video_utils_1 = require("./video.utils");
exports.videoService = {
    async uploadVideo(userId, file, metadata) {
        if (!(0, video_utils_1.isAllowedMimeType)(file.mimetype)) {
            const err = new Error('Invalid file type. Allowed: mp4, mov, webm');
            err.statusCode = 400;
            throw err;
        }
        const key = (0, video_utils_1.generateStorageKey)(file.originalname, file.mimetype);
        await (0, r2_upload_1.uploadToR2)({
            key,
            body: file.buffer,
            contentType: file.mimetype,
        });
        const fileUrl = (0, r2_client_1.getR2PublicUrl)(key);
        const input = {
            title: metadata?.title,
            description: metadata?.description,
            fileName: file.originalname,
            fileUrl,
            fileSize: file.size,
            mimeType: file.mimetype,
            uploadedBy: userId,
        };
        const doc = new video_model_1.VideoModel({
            ...input,
            uploadedBy: input.uploadedBy,
            storagePath: key,
            status: 'uploaded',
        });
        const saved = await doc.save();
        return { id: saved._id.toString(), fileUrl };
    },
    async requestProcessing(input) {
        const video = await video_model_1.VideoModel.findById(input.videoId).lean().exec();
        if (!video) {
            const err = new Error('Video not found');
            err.statusCode = 404;
            throw err;
        }
        const storagePath = video.storagePath;
        if (!storagePath) {
            const err = new Error('Video storage path not found');
            err.statusCode = 400;
            throw err;
        }
        const { jobId } = await job_service_1.jobService.create({
            videoId: input.videoId,
            bbox: input.bbox,
            ratio: input.ratio,
        });
        const bboxArr = [
            input.bbox.x,
            input.bbox.y,
            input.bbox.width,
            input.bbox.height,
        ];
        await (0, video_job_1.addProcessVideoJob)({
            jobId,
            videoId: input.videoId,
            videoPath: storagePath,
            bbox: bboxArr,
            ratio: input.ratio,
        });
        return { jobId, status: 'queued' };
    },
    async setProcessed(videoId, outputPath) {
        await video_model_1.VideoModel.findByIdAndUpdate(videoId, {
            status: 'processed',
            processedVideo: outputPath,
        }).exec();
    },
};
function isAllowedRatio(ratio) {
    return video_types_1.PROCESSING_RATIOS.includes(ratio);
}
//# sourceMappingURL=video.service.js.map