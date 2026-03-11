"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleController = void 0;
const example_service_1 = require("./example.service");
const response_1 = require("../../utils/response");
const zod_1 = require("zod");
const createExampleSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
});
exports.exampleController = {
    async getExamples(_req, res) {
        try {
            const examples = await example_service_1.exampleService.getExamples();
            (0, response_1.sendSuccess)(res, { data: examples });
        }
        catch (err) {
            (0, response_1.sendError)(res, err instanceof Error ? err.message : 'Failed to fetch examples', 500);
        }
    },
    async createExample(req, res) {
        try {
            const parsed = createExampleSchema.safeParse(req.body);
            if (!parsed.success) {
                (0, response_1.sendError)(res, parsed.error.message, 400);
                return;
            }
            const example = await example_service_1.exampleService.createExample(parsed.data);
            (0, response_1.sendSuccess)(res, { data: example }, 201);
        }
        catch (err) {
            (0, response_1.sendError)(res, err instanceof Error ? err.message : 'Failed to create example', 500);
        }
    },
};
//# sourceMappingURL=example.controller.js.map