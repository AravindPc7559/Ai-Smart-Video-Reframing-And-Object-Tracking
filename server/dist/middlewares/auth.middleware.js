"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        const err = new Error('Unauthorized');
        err.statusCode = 401;
        return next(err);
    }
    const token = authHeader.slice(7);
    try {
        const payload = (0, jwt_1.verifyToken)(token);
        req.user = { id: payload.userId };
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