import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { AppError } from './error.middleware';
import { verifyToken } from '../utils/jwt';

export const authMiddleware = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    const err = new Error('Unauthorized') as AppError;
    err.statusCode = 401;
    return next(err);
  }
  const token = authHeader.slice(7);
  try {
    const payload = verifyToken(token);
    req.user = { id: payload.userId };
    next();
  } catch {
    const err = new Error('Invalid token') as AppError;
    err.statusCode = 401;
    next(err);
  }
};
