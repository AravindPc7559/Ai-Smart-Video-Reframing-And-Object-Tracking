"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleRoutes = void 0;
const express_1 = require("express");
const example_controller_1 = require("./example.controller");
const router = (0, express_1.Router)();
router.get('/', example_controller_1.exampleController.getExamples);
router.post('/', example_controller_1.exampleController.createExample);
exports.exampleRoutes = router;
//# sourceMappingURL=example.routes.js.map