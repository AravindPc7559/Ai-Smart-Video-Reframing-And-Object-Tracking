import { ExampleModel, IExample, ExamplePlain } from './example.model';

export interface CreateExampleInput {
  name: string;
  description?: string;
}

export const exampleRepository = {
  async findAll(): Promise<ExamplePlain[]> {
    const result = await ExampleModel.find().sort({ createdAt: -1 }).lean().exec();
    return result as ExamplePlain[];
  },

  async create(data: CreateExampleInput): Promise<IExample> {
    const doc = new ExampleModel(data);
    return doc.save();
  },

  async findById(id: string): Promise<ExamplePlain | null> {
    const result = await ExampleModel.findById(id).lean().exec();
    return result as ExamplePlain | null;
  },
};
