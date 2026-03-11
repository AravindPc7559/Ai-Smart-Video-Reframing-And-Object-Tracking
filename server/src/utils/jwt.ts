import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface JwtPayload {
  userId: string;
}

export function generateAccessToken(payload: JwtPayload): string {
  if (!env.JWT_SECRET) throw new Error('JWT_SECRET is not configured');
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
}

export function verifyToken(token: string): JwtPayload {
  if (!env.JWT_SECRET) throw new Error('JWT_SECRET is not configured');
  const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
  if (!decoded?.userId) throw new Error('Invalid token payload');
  return decoded;
}
