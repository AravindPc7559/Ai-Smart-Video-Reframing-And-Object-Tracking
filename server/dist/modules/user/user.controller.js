"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const response_1 = require("../../utils/response");
const zod_1 = require("zod");
const registerSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, 'Full name is required'),
    mobile: zod_1.z.string().min(1, 'Mobile is required'),
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().min(1, 'Email is required'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
exports.userController = {
    async register(req, res, next) {
        try {
            const parsed = registerSchema.safeParse(req.body);
            if (!parsed.success) {
                const err = new Error(parsed.error.errors.map((e) => e.message).join(', '));
                err.statusCode = 400;
                return next(err);
            }
            const result = await user_service_1.userService.register(parsed.data);
            (0, response_1.sendSuccess)(res, {
                success: true,
                message: 'User registered successfully',
                data: { user: result.user, token: result.token },
            }, 201);
        }
        catch (err) {
            next(err);
        }
    },
    async login(req, res, next) {
        try {
            const parsed = loginSchema.safeParse(req.body);
            if (!parsed.success) {
                const err = new Error(parsed.error.errors.map((e) => e.message).join(', '));
                err.statusCode = 400;
                return next(err);
            }
            const result = await user_service_1.userService.login(parsed.data);
            (0, response_1.sendSuccess)(res, {
                success: true,
                message: 'Login successful',
                data: { user: result.user, token: result.token },
            });
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=user.controller.js.map