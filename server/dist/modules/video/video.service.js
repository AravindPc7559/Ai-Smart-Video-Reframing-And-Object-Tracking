"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoService = void 0;
const video_model_1 = require("./video.model");
const video_types_1 = require("./video.types");
const r2_upload_1 = require("../../utils/r2/r2.upload");
const r2_client_1 = require("../../utils/r2/r2.client");
function isAllowedMimeType(mimeType) {
    return video_types_1.ALLOWED_VIDEO_MIME_TYPES.includes(mimeType);
}
function generateStorageKey(_fileName, mimeType) {
    const ext = mimeType === 'video/quicktime' ? 'mov' : mimeType.split('/')[1] ?? 'mp4';
    const unique = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
    return `videos/${unique}.${ext}`;
}
exports.videoService = {
    isAllowedMimeType,
    async uploadVideo(userId, file, metadata) {
        if (!isAllowedMimeType(file.mimetype)) {
            const err = new Error('Invalid file type. Allowed: mp4, mov, webm');
            err.statusCode = 400;
            throw err;
        }
        const key = generateStorageKey(file.originalname, file.mimetype);
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
        });
        const saved = await doc.save();
        return { id: saved._id.toString(), fileUrl };
    },
};
//# sourceMappingURL=video.service.js.map