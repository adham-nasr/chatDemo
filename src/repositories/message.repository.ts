import { Message, IMessage } from '../models/Message.js';
import { Types } from 'mongoose';

export class MessageRepository {
  async findMessagesByGroupId(groupId: string): Promise<IMessage[]> {
    return await Message.find({ group: new Types.ObjectId(groupId) })
      .populate('sender', 'username')
      .sort({ createdAt: 1 });
  }

  async createMessage(messageData: Partial<IMessage>): Promise<IMessage> {
    return await Message.create(messageData);
  }
}
