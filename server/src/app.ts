import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { routes } from './routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { env } from './config/env';

const app = express();

app.use(
  cors({
    origin:
      env.NODE_ENV === 'production'
        ? env.CORS_ORIGIN ?? false
        : true,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev')
);

app.use(routes);

app.use(errorMiddleware);

export default app;
