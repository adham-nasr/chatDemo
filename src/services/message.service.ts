import { MessageRepository } from '../repositories/message.repository.js';
import { GroupRepository } from '../repositories/group.repository.js';

const messageRepository = new MessageRepository();
const groupRepository = new GroupRepository();

export const getGroupMessagesService = async (groupId: string, userId: string) => {
  const group = await groupRepository.findGroupById(groupId);
  if (!group) {
    throw new Error('Group not found');
  }

  if (!group.members.includes(userId as any)) {
    throw new Error('Access denied. You are not a member of this group.');
  }

  const messages = await messageRepository.findMessagesByGroupId(groupId);
  return messages;
};
