import { type IMessage } from '../models/Message.js';
export declare class MessageRepository {
    findMessagesByGroupId(groupId: string): Promise<IMessage[]>;
    createMessage(messageData: Partial<IMessage>): Promise<IMessage>;
}
//# sourceMappingURL=message.repository.d.ts.map