import express from 'express';
import { routes } from './routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { requestLogger } from './utils/logger';

const app = express();

app.use(express.json());
app.use((req, _res, next) => {
  requestLogger(req);
  next();
});

app.use(routes);

app.use(errorMiddleware);

export default app;
