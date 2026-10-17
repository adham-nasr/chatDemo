import type { Request, Response } from 'express';
import { registerUserService, loginUserService } from '../services/auth.service.js';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const result = await registerUserService({ username, password });

    return res.status(201).json({
      message: 'User registered successfully',
      ...result,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const result = await loginUserService({ username, password });

    return res.status(200).json({
      message: 'Logged in successfully',
      ...result,
    });
  } catch (error: any) {
    return res.status(401).json({ message: error.message || 'Internal server error' });
  }
};
