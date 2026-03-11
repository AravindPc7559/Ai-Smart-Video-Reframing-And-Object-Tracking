import { Router, Request } from 'express';
import multer from 'multer';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { videoController } from './video.controller';
import { ALLOWED_VIDEO_MIME_TYPES, UPLOAD_FIELD } from './video.types';
import { env } from '../../config/env';
import { AppError } from '../../middlewares/error.middleware';

const storage = multer.memoryStorage();

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const allowed = ALLOWED_VIDEO_MIME_TYPES as readonly string[];
  if (!allowed.includes(file.mimetype)) {
    const err = new Error('Invalid file type. Allowed: mp4, mov, webm') as AppError;
    err.statusCode = 400;
    cb(err);
    return;
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: env.VIDEO_MAX_FILE_SIZE },
});

const router = Router();

router.post(
  '/upload',
  authMiddleware,
  upload.single(UPLOAD_FIELD),
  videoController.upload
);

export const videoRoutes = router;

const processRouter = Router();
processRouter.post('/process', videoController.process);
export const videoProcessRoutes = processRouter;
