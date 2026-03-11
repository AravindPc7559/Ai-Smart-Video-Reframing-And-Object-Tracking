import { Router, Request, Response } from 'express';
import { exampleRoutes } from '../modules/example/example.routes';
import { videoRoutes, videoProcessRoutes } from '../modules/video/video.routes';
import { userRoutes } from '../modules/user/user.routes';
import { jobRoutes } from '../modules/job/job.routes';

const router = Router();

router.get('/health', (_req: Request, res: Response): void => {
  res.json({ status: 'ok' });
});

router.use('/examples', exampleRoutes);
router.use('/api/video', videoRoutes);
router.use('/api/videos', videoProcessRoutes);
router.use('/api/jobs', jobRoutes);
router.use('/api/user', userRoutes);

export const routes = router;
