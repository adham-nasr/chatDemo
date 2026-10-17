import type { Response } from 'express';
import type { AuthenticatedRequest } from '../types.js';
import { Group } from '../models/Group.js';

export const createGroup = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, description } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const group = await Group.create({
      name,
      description,
      admin: userId,
      members: [userId],
    });

    return res.status(201).json({
      message: 'Group created successfully',
      group,
    });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getGroups = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    const groups = await Group.find({ members: userId });

    return res.status(200).json({ groups });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const joinGroup = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const groupId = req.params.id;
    const userId = req.user?.userId;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (group.members.includes(userId as any)) {
      return res.status(400).json({ message: 'User is already a member of this group' });
    }

    group.members.push(userId as any);
    await group.save();

    return res.status(200).json({ message: 'Joined group successfully', group });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
