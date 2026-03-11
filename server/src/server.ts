import app from './app';
import { env } from './config/env';
import { connectDb } from './config/db';
import { logger } from './utils/logger';
import { createVideoWorker } from './queues/workers/video.worker';

const start = async (): Promise<void> => {
  await connectDb();
  const worker = createVideoWorker();
  worker.on('error', (err) => {
    logger.warn({ err }, 'Redis unavailable; video processing disabled');
  });
  const server = app.listen(env.PORT, () => {
    logger.info({ port: env.PORT }, 'Server started');
  });
  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      logger.error(
        { port: env.PORT },
        `Port ${env.PORT} is already in use. Stop the other process or set PORT to a different number.`
      );
      process.exit(1);
    }
    throw err;
  });
};

start().catch((err) => {
  logger.error({ err }, 'Failed to start server');
  process.exit(1);
});
