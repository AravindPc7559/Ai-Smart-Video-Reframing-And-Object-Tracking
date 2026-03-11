"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addExampleJob = void 0;
const queue_1 = require("../queue");
const addExampleJob = async (data) => {
    const job = await queue_1.exampleQueue.add('process-example', data);
    return job.id ?? '';
};
exports.addExampleJob = addExampleJob;
//# sourceMappingURL=example.job.js.map