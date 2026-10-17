import type { Request, Response, NextFunction } from 'express';
import type { AnyZodObject } from 'zod';

export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = await schema.parseAsync(req.body);
    next();
  } catch (error: any) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.errors || error.message,
    });
  }
};
