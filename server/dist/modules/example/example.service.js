"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleService = void 0;
const example_repository_1 = require("./example.repository");
const example_job_1 = require("../../queues/jobs/example.job");
exports.exampleService = {
    async getExamples() {
        return example_repository_1.exampleRepository.findAll();
    },
    async createExample(data) {
        const example = await example_repository_1.exampleRepository.create(data);
        await (0, example_job_1.addExampleJob)({ message: `Created example: ${example.name}` });
        return example;
    },
};
//# sourceMappingURL=example.service.js.map