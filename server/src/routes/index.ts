import { Router, Request, Response } from 'express';
import { exampleRoutes } from '../modules/example/example.routes';
import { videoRoutes } from '../modules/video/video.routes';
import { userRoutes } from '../modules/user/user.routes';

const router = Router();

router.get('/health', (_req: Request, res: Response): void => {
  res.json({ status: 'ok' });
});

router.use('/examples', exampleRoutes);
router.use('/api/video', videoRoutes);
router.use('/api/user', userRoutes);

export const routes = router;
