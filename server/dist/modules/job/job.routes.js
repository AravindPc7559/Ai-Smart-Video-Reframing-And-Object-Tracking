"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRoutes = void 0;
const express_1 = require("express");
const job_controller_1 = require("./job.controller");
const router = (0, express_1.Router)();
router.get('/:jobId', job_controller_1.jobController.getById);
exports.jobRoutes = router;
//# sourceMappingURL=job.routes.js.map