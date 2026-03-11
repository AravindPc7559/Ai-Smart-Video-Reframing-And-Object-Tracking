import app from './app';
import { env } from './config/env';
import { connectDb } from './config/db';
import { logger } from './utils/logger';
import { createVideoWorker } from './queues/workers/video.worker';

const start = async (): Promise<void> => {
  await connectDb();
  createVideoWorker();
  app.listen(env.PORT, () => {
    logger.info({ port: env.PORT }, 'Server started');
  });
};

start().catch((err) => {
  logger.error({ err }, 'Failed to start server');
  process.exit(1);
});
