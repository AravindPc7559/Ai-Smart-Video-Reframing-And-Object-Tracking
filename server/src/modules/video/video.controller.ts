import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../types';
import { videoService, isAllowedRatio } from './video.service';
import { sendSuccess } from '../../utils/response';
import { AppError } from '../../middlewares/error.middleware';
import { validateBbox } from './video.utils';

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

  async process(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { videoId, bbox, ratio } = req.body ?? {};
      if (!videoId || typeof videoId !== 'string' || videoId.trim() === '') {
        const err = new Error('videoId is required') as AppError;
        err.statusCode = 400;
        return next(err);
      }
      if (!validateBbox(bbox)) {
        const err = new Error('Invalid bounding box') as AppError;
        err.statusCode = 400;
        return next(err);
      }
      if (!ratio || typeof ratio !== 'string' || !isAllowedRatio(ratio)) {
        const err = new Error('Invalid ratio. Supported: 9:16, 1:1, 16:9') as AppError;
        err.statusCode = 400;
        return next(err);
      }
      const result = await videoService.requestProcessing({
        videoId: videoId.trim(),
        bbox: { x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height },
        ratio,
      });
      sendSuccess(res, { jobId: result.jobId, status: result.status }, 202);
    } catch (err) {
      next(err);
    }
  },
};
