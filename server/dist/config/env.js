"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.string().transform(Number).default('3000'),
    MONGODB_URI: zod_1.z.string().min(1),
    REDIS_HOST: zod_1.z.string().default('localhost'),
    REDIS_PORT: zod_1.z.string().transform(Number).default('6379'),
    REDIS_PASSWORD: zod_1.z.string().optional().default(''),
    JWT_SECRET: zod_1.z.string().optional().default(''),
    R2_ACCOUNT_ID: zod_1.z.string().optional(),
    R2_ACCESS_KEY_ID: zod_1.z.string().optional(),
    R2_SECRET_ACCESS_KEY: zod_1.z.string().optional(),
    R2_BUCKET_NAME: zod_1.z.string().optional(),
    R2_PUBLIC_URL: zod_1.z.string().optional(),
    VIDEO_MAX_FILE_SIZE: zod_1.z.string().transform(Number).optional().default('104857600'),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    throw new Error(`Invalid environment variables: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`);
}
exports.env = parsed.data;
//# sourceMappingURL=env.js.map