import { Queue } from 'bullmq';
import { createRedisConnection } from '../config/redis';
import { env } from '../config/env';

const connection = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  ...(env.REDIS_PASSWORD && { password: env.REDIS_PASSWORD }),
};

export const exampleQueue = new Queue('example', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 },
    removeOnComplete: 100,
  },
});

export const getConnection = () => createRedisConnection();
