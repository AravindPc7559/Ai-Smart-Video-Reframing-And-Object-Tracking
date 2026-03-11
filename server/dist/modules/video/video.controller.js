"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPLOAD_FIELD = exports.videoController = void 0;
const video_service_1 = require("./video.service");
const response_1 = require("../../utils/response");
const UPLOAD_FIELD = 'video';
exports.UPLOAD_FIELD = UPLOAD_FIELD;
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
};
//# sourceMappingURL=video.controller.js.map