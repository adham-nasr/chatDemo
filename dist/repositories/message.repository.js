import { Message } from '../models/Message.js';
import { Types } from 'mongoose';
export class MessageRepository {
    async findMessagesByGroupId(groupId) {
        return await Message.find({ group: new Types.ObjectId(groupId) })
            .populate('sender', 'username')
            .sort({ createdAt: 1 });
    }
    async createMessage(messageData) {
        return await Message.create(messageData);
    }
}
//# sourceMappingURL=message.repository.js.map