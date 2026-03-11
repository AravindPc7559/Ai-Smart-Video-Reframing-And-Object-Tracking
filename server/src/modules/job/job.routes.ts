import { Router } from 'express';
import { jobController } from './job.controller';

const router = Router();

router.get('/:jobId', jobController.getById);

export const jobRoutes = router;
