import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthenticatedRequest } from '../types.js';

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || 'supersecretkey';
    const payload = jwt.verify(token, secret) as { userId: string; username: string };
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
