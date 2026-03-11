"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("./user.model");
const password_1 = require("../../utils/password");
const jwt_1 = require("../../utils/jwt");
function toPublic(user) {
    return user.toJSON();
}
exports.userService = {
    async register(input) {
        const existing = await user_model_1.UserModel.findOne({
            $or: [{ email: input.email }, { mobile: input.mobile }],
        });
        if (existing) {
            const err = new Error(existing.email === input.email ? 'Email already registered' : 'Mobile already registered');
            err.statusCode = 409;
            throw err;
        }
        const hashed = await (0, password_1.hashPassword)(input.password);
        const user = await user_model_1.UserModel.create({
            fullName: input.fullName,
            mobile: input.mobile,
            email: input.email,
            password: hashed,
        });
        const token = (0, jwt_1.generateAccessToken)({ userId: user._id.toString() });
        return { user: toPublic(user), token };
    },
    async login(input) {
        const user = await user_model_1.UserModel.findOne({ email: input.email });
        if (!user) {
            const err = new Error('Invalid email or password');
            err.statusCode = 401;
            throw err;
        }
        const match = await (0, password_1.comparePassword)(input.password, user.password);
        if (!match) {
            const err = new Error('Invalid email or password');
            err.statusCode = 401;
            throw err;
        }
        const token = (0, jwt_1.generateAccessToken)({ userId: user._id.toString() });
        return { user: toPublic(user), token };
    },
};
//# sourceMappingURL=user.service.js.map