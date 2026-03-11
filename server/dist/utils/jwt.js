"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
function generateAccessToken(payload) {
    if (!env_1.env.JWT_SECRET)
        throw new Error('JWT_SECRET is not configured');
    return jsonwebtoken_1.default.sign(payload, env_1.env.JWT_SECRET, { expiresIn: env_1.env.JWT_EXPIRES_IN });
}
function verifyToken(token) {
    if (!env_1.env.JWT_SECRET)
        throw new Error('JWT_SECRET is not configured');
    const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
    if (!decoded?.userId)
        throw new Error('Invalid token payload');
    return decoded;
}
//# sourceMappingURL=jwt.js.map