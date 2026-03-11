import { Worker, Job } from 'bullmq';
import { env } from '../../config/env';
import { logger } from '../../utils/logger';
import { ExampleJobData } from '../jobs/example.job';

const connection = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  ...(env.REDIS_PASSWORD && { password: env.REDIS_PASSWORD }),
};

export const createExampleWorker = (): Worker<ExampleJobData> => {
  const worker = new Worker<ExampleJobData>(
    'example',
    async (job: Job<ExampleJobData>) => {
      logger.info({ jobId: job.id, data: job.data }, 'Processing example job');
      return { processed: true, message: job.data.message };
    },
    { connection }
  );

  worker.on('completed', (job) => {
    logger.info({ jobId: job.id }, 'Example job completed');
  });

  worker.on('failed', (job, err) => {
    logger.error({ jobId: job?.id, err }, 'Example job failed');
  });

  return worker;
};
