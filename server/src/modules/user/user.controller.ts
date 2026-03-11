import { Request, Response, NextFunction } from 'express';
import { userService } from './user.service';
import { sendSuccess } from '../../utils/response';
import { AppError } from '../../middlewares/error.middleware';
import { z } from 'zod';

const registerSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  mobile: z.string().min(1, 'Mobile is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const userController = {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = registerSchema.safeParse(req.body);
      if (!parsed.success) {
        const err = new Error(parsed.error.errors.map((e) => e.message).join(', ')) as AppError;
        err.statusCode = 400;
        return next(err);
      }
      const result = await userService.register(parsed.data);
      sendSuccess(
        res,
        {
          success: true,
          message: 'User registered successfully',
          data: { user: result.user, token: result.token },
        },
        201
      );
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        const err = new Error(parsed.error.errors.map((e) => e.message).join(', ')) as AppError;
        err.statusCode = 400;
        return next(err);
      }
      const result = await userService.login(parsed.data);
      sendSuccess(res, {
        success: true,
        message: 'Login successful',
        data: { user: result.user, token: result.token },
      });
    } catch (err) {
      next(err);
    }
  },
};
