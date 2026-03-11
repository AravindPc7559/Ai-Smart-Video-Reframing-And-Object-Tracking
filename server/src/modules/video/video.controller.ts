import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../types';
import { videoService } from './video.service';
import { sendSuccess } from '../../utils/response';
import { AppError } from '../../middlewares/error.middleware';

const UPLOAD_FIELD = 'video';

export const videoController = {
  async upload(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const file = req.file;
      if (!file) {
        const err = new Error('Missing file') as AppError;
        err.statusCode = 400;
        return next(err);
      }

      const userId = req.user?.id;
      if (!userId) {
        const err = new Error('Unauthorized') as AppError;
        err.statusCode = 401;
        return next(err);
      }

      const title = typeof req.body?.title === 'string' ? req.body.title : undefined;
      const description = typeof req.body?.description === 'string' ? req.body.description : undefined;

      const result = await videoService.uploadVideo(
        userId,
        {
          buffer: file.buffer,
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
        },
        { title, description }
      );

      sendSuccess(
        res,
        {
          success: true,
          message: 'Video uploaded successfully',
          data: { id: result.id, fileUrl: result.fileUrl },
        },
        201
      );
    } catch (err) {
      next(err instanceof Error ? err : new Error('Video upload failed'));
    }
  },
};

export { UPLOAD_FIELD };
