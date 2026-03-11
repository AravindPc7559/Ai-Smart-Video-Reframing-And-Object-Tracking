import { Request } from 'express';

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
