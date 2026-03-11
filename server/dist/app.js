"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const error_middleware_1 = require("./middlewares/error.middleware");
const logger_1 = require("./utils/logger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, _res, next) => {
    (0, logger_1.requestLogger)(req);
    next();
});
app.use(routes_1.routes);
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map