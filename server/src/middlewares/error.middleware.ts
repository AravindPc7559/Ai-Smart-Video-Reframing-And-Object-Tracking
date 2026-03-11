import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { logger } from '../utils/logger';

export interface AppError extends Error {
  statusCode?: number;
}

function getStatusCode(err: AppError): number {
  if (err.statusCode != null) return err.statusCode;
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') return 413;
    return 400;
  }
  return 500;
}

export const errorMiddleware = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = getStatusCode(err);
  const message = err.message ?? 'Internal server error';

  logger.error({ err, statusCode }, message);

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
