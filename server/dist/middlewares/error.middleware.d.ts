import { Request, Response, NextFunction } from 'express';
export interface AppError extends Error {
    statusCode?: number;
}
export declare const errorMiddleware: (err: AppError, _req: Request, res: Response, _next: NextFunction) => void;
//# sourceMappingURL=error.middleware.d.ts.map