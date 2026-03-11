"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoController = void 0;
const video_service_1 = require("./video.service");
const response_1 = require("../../utils/response");
const video_utils_1 = require("./video.utils");
exports.videoController = {
    async upload(req, res, next) {
        try {
            const file = req.file;
            if (!file) {
                const err = new Error('Missing file');
                err.statusCode = 400;
                return next(err);
            }
            const userId = req.user?.id;
            if (!userId) {
                const err = new Error('Unauthorized');
                err.statusCode = 401;
                return next(err);
            }
            const title = typeof req.body?.title === 'string' ? req.body.title : undefined;
            const description = typeof req.body?.description === 'string' ? req.body.description : undefined;
            const result = await video_service_1.videoService.uploadVideo(userId, {
                buffer: file.buffer,
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
            }, { title, description });
            (0, response_1.sendSuccess)(res, {
                success: true,
                message: 'Video uploaded successfully',
                data: { id: result.id, fileUrl: result.fileUrl },
            }, 201);
        }
        catch (err) {
            next(err instanceof Error ? err : new Error('Video upload failed'));
        }
    },
    async process(req, res, next) {
        try {
            const { videoId, bbox, ratio } = req.body ?? {};
            if (!videoId || typeof videoId !== 'string' || videoId.trim() === '') {
                const err = new Error('videoId is required');
                err.statusCode = 400;
                return next(err);
            }
            if (!(0, video_utils_1.validateBbox)(bbox)) {
                const err = new Error('Invalid bounding box');
                err.statusCode = 400;
                return next(err);
            }
            if (!ratio || typeof ratio !== 'string' || !(0, video_service_1.isAllowedRatio)(ratio)) {
                const err = new Error('Invalid ratio. Supported: 9:16, 1:1, 16:9');
                err.statusCode = 400;
                return next(err);
            }
            const result = await video_service_1.videoService.requestProcessing({
                videoId: videoId.trim(),
                bbox: { x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height },
                ratio,
            });
            (0, response_1.sendSuccess)(res, { jobId: result.jobId, status: result.status }, 202);
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=video.controller.js.map