import { exampleQueue } from '../queue';

export interface ExampleJobData {
  message: string;
  payload?: Record<string, unknown>;
}

export const addExampleJob = async (data: ExampleJobData): Promise<string> => {
  const job = await exampleQueue.add('process-example', data);
  return job.id ?? '';
};
