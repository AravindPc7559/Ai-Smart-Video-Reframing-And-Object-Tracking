"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, data, statusCode = 200) => {
    res.status(statusCode).json(data);
};
exports.sendSuccess = sendSuccess;
const sendError = (res, message, statusCode = 500) => {
    res.status(statusCode).json({ error: message });
};
exports.sendError = sendError;
//# sourceMappingURL=response.js.map