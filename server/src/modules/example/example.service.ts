import { exampleRepository, CreateExampleInput } from './example.repository';
import { addExampleJob } from '../../queues/jobs/example.job';
import { IExample, ExamplePlain } from './example.model';

export const exampleService = {
  async getExamples(): Promise<ExamplePlain[]> {
    return exampleRepository.findAll();
  },

  async createExample(data: CreateExampleInput): Promise<IExample> {
    const example = await exampleRepository.create(data);
    await addExampleJob({ message: `Created example: ${example.name}` });
    return example;
  },
};
