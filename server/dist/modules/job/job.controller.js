"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobController = void 0;
const job_service_1 = require("./job.service");
const response_1 = require("../../utils/response");
exports.jobController = {
    async getById(req, res, next) {
        try {
            const { jobId } = req.params;
            if (!jobId) {
                const err = new Error('Job ID is required');
                err.statusCode = 400;
                return next(err);
            }
            const result = await job_service_1.jobService.getById(jobId);
            if (!result) {
                const err = new Error('Job not found');
                err.statusCode = 404;
                return next(err);
            }
            const body = { status: result.status };
            if (result.outputUrl)
                body.outputUrl = result.outputUrl;
            (0, response_1.sendSuccess)(res, body);
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=job.controller.js.map