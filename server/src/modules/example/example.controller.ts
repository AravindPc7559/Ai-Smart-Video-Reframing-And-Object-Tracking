import { Request, Response } from 'express';
import { exampleService } from './example.service';
import { sendSuccess, sendError } from '../../utils/response';
import { z } from 'zod';

const createExampleSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export const exampleController = {
  async getExamples(_req: Request, res: Response): Promise<void> {
    try {
      const examples = await exampleService.getExamples();
      sendSuccess(res, { data: examples });
    } catch (err) {
      sendError(res, err instanceof Error ? err.message : 'Failed to fetch examples', 500);
    }
  },

  async createExample(req: Request, res: Response): Promise<void> {
    try {
      const parsed = createExampleSchema.safeParse(req.body);
      if (!parsed.success) {
        sendError(res, parsed.error.message, 400);
        return;
      }
      const example = await exampleService.createExample(parsed.data);
      sendSuccess(res, { data: example }, 201);
    } catch (err) {
      sendError(res, err instanceof Error ? err.message : 'Failed to create example', 500);
    }
  },
};
