import type { Response } from 'express';
import type { AuthenticatedRequest } from '../types.js';

export const createGroup = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, description } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Dummy service call layer
    const group = {
      _id: 'dummy_group_id',
      name,
      description,
      admin: userId,
      members: [userId],
      createdAt: new Date(),
    };

    return res.status(201).json({
      message: 'Group created successfully (dummy)',
      group,
    });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getGroups = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    // Dummy service call layer
    const groups = [
      {
        _id: 'dummy_group_id_1',
        name: 'General Chat',
        description: 'A dummy group',
        admin: userId,
        members: [userId],
        createdAt: new Date(),
      },
    ];

    return res.status(200).json({ groups });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const joinGroup = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const groupId = req.params.id;
    const userId = req.user?.userId;

    // Dummy service call layer
    const group = {
      _id: groupId,
      name: 'Dummy Group',
      members: [userId],
    };

    return res.status(200).json({ message: 'Joined group successfully (dummy)', group });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
