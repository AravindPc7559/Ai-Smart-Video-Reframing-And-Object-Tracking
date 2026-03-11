"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.post('/register', user_controller_1.userController.register);
router.post('/login', user_controller_1.userController.login);
exports.userRoutes = router;
//# sourceMappingURL=user.routes.js.map