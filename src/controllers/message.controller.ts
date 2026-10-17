import type { Response } from 'express';
import type { AuthenticatedRequest } from '../types.js';
import { getGroupMessagesService } from '../services/message.service.js';

export const getGroupMessages = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const groupId = req.params.id;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const messages = await getGroupMessagesService(groupId, userId);

    return res.status(200).json({ messages });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || 'Internal server error' });
  }
};
