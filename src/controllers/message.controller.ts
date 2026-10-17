import type { Response } from 'express';
import type { AuthenticatedRequest } from '../types.js';
import { Message } from '../models/Message.js';
import { Group } from '../models/Group.js';

export const getGroupMessages = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const groupId = req.params.id;
    const userId = req.user?.userId;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (!group.members.includes(userId as any)) {
      return res.status(403).json({ message: 'Access denied. You are not a member of this group.' });
    }

    const messages = await Message.find({ group: groupId })
      .populate('sender', 'username')
      .sort({ createdAt: 1 });

    return res.status(200).json({ messages });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
