"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBbox = validateBbox;
exports.isAllowedMimeType = isAllowedMimeType;
exports.generateStorageKey = generateStorageKey;
const video_types_1 = require("./video.types");
function validateBbox(bbox) {
    if (!bbox || typeof bbox !== 'object')
        return false;
    const b = bbox;
    return (typeof b.x === 'number' &&
        typeof b.y === 'number' &&
        typeof b.width === 'number' &&
        typeof b.height === 'number');
}
function isAllowedMimeType(mimeType) {
    return video_types_1.ALLOWED_VIDEO_MIME_TYPES.includes(mimeType);
}
function generateStorageKey(_fileName, mimeType) {
    const ext = mimeType === 'video/quicktime' ? 'mov' : mimeType.split('/')[1] ?? 'mp4';
    const unique = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
    return `videos/${unique}.${ext}`;
}
//# sourceMappingURL=video.utils.js.map