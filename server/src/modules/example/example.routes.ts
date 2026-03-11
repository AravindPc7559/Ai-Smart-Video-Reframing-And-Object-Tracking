import { Router } from 'express';
import { exampleController } from './example.controller';

const router = Router();

router.get('/', exampleController.getExamples);
router.post('/', exampleController.createExample);

export const exampleRoutes = router;
