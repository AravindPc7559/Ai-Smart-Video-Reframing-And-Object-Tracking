import pino from 'pino';
import { env } from '../config/env';

export const logger = pino({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport:
    env.NODE_ENV !== 'production'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined,
});

export const requestLogger = (req: { method: string; url: string; ip?: string }) => {
  logger.info({ method: req.method, url: req.url, ip: req.ip }, 'request');
};
