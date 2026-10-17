import type { Response } from 'express';
import type { AuthenticatedRequest } from '../types.js';

export const getGroupMessages = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const groupId = req.params.id;
    const userId = req.user?.userId;

    // Dummy service call layer
    const messages = [
      {
        _id: 'dummy_message_id',
        sender: { _id: userId, username: req.user?.username || 'user' },
        group: groupId,
        content: 'Hello, this is a dummy message',
        createdAt: new Date(),
      },
    ];

    return res.status(200).json({ messages });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
