import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../types';
declare const UPLOAD_FIELD = "video";
export declare const videoController: {
    upload(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
};
export { UPLOAD_FIELD };
//# sourceMappingURL=video.controller.d.ts.map