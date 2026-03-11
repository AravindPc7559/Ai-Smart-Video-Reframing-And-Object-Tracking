"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoProcessRoutes = exports.videoRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const video_controller_1 = require("./video.controller");
const video_types_1 = require("./video.types");
const env_1 = require("../../config/env");
const storage = multer_1.default.memoryStorage();
const fileFilter = (_req, file, cb) => {
    const allowed = video_types_1.ALLOWED_VIDEO_MIME_TYPES;
    if (!allowed.includes(file.mimetype)) {
        const err = new Error('Invalid file type. Allowed: mp4, mov, webm');
        err.statusCode = 400;
        cb(err);
        return;
    }
    cb(null, true);
};
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: env_1.env.VIDEO_MAX_FILE_SIZE },
});
const router = (0, express_1.Router)();
router.post('/upload', auth_middleware_1.authMiddleware, upload.single(video_types_1.UPLOAD_FIELD), video_controller_1.videoController.upload);
exports.videoRoutes = router;
const processRouter = (0, express_1.Router)();
processRouter.post('/process', video_controller_1.videoController.process);
exports.videoProcessRoutes = processRouter;
//# sourceMappingURL=video.routes.js.map