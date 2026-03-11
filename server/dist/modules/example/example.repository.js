"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleRepository = void 0;
const example_model_1 = require("./example.model");
exports.exampleRepository = {
    async findAll() {
        const result = await example_model_1.ExampleModel.find().sort({ createdAt: -1 }).lean().exec();
        return result;
    },
    async create(data) {
        const doc = new example_model_1.ExampleModel(data);
        return doc.save();
    },
    async findById(id) {
        const result = await example_model_1.ExampleModel.findById(id).lean().exec();
        return result;
    },
};
//# sourceMappingURL=example.repository.js.map