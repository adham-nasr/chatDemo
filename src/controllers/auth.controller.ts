import type { Request, Response } from 'express';
import { User } from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { hashPasssword, verifyPassword } from '../utils/password.js';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    const hashedPassword = await hashPasssword(password);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    const token = generateToken({ userId: user._id.toString(), username: user.username });

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken({ userId: user._id.toString(), username: user.username });

    return res.status(200).json({
      message: 'Logged in successfully',
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
