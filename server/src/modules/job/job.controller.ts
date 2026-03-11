import { Request, Response, NextFunction } from 'express';
import { jobService } from './job.service';
import { sendSuccess } from '../../utils/response';
import { AppError } from '../../middlewares/error.middleware';

export const jobController = {
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { jobId } = req.params;
      if (!jobId) {
        const err = new Error('Job ID is required') as AppError;
        err.statusCode = 400;
        return next(err);
      }
      const result = await jobService.getById(jobId as string);
      if (!result) {
        const err = new Error('Job not found') as AppError;
        err.statusCode = 404;
        return next(err);
      }
      const body: { status: string; outputUrl?: string } = { status: result.status };
      if (result.outputUrl) body.outputUrl = result.outputUrl;
      sendSuccess(res, body);
    } catch (err) {
      next(err);
    }
  },
};
