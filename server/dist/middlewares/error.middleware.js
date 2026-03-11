"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const logger_1 = require("../utils/logger");
function getStatusCode(err) {
    if (err.statusCode != null)
        return err.statusCode;
    if (err instanceof multer_1.default.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE')
            return 413;
        return 400;
    }
    return 500;
}
const errorMiddleware = (err, _req, res, _next) => {
    const statusCode = getStatusCode(err);
    const message = err.message ?? 'Internal server error';
    logger_1.logger.error({ err, statusCode }, message);
    res.status(statusCode).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map