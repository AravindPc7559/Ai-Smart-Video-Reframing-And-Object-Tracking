import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../types';
export declare const videoController: {
    upload(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
    process(req: Request, res: Response, next: NextFunction): Promise<void>;
};
//# sourceMappingURL=video.controller.d.ts.map