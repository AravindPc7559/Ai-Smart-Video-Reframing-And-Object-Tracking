import { Router, Request, Response } from 'express';
import { exampleRoutes } from '../modules/example/example.routes';
import { videoRoutes } from '../modules/video/video.routes';

const router = Router();

router.get('/health', (_req: Request, res: Response): void => {
  res.json({ status: 'ok' });
});

router.use('/examples', exampleRoutes);
router.use('/api/video', videoRoutes);

export const routes = router;
