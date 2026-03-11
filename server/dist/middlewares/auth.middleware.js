"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        const err = new Error('Unauthorized');
        err.statusCode = 401;
        return next(err);
    }
    const token = authHeader.slice(7);
    try {
        req.user = { id: token };
        next();
    }
    catch {
        const err = new Error('Invalid token');
        err.statusCode = 401;
        next(err);
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map