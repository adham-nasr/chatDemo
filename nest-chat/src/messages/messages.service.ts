import { Injectable } from '@nestjs/common';
import { MessagesRepository } from "./messages.repository.js";
import { GroupsRepository } from '../groups/groups.repository';
@Injectable()
export class MessagesService {

  constructor(private readonly messageRepository: MessagesRepository, private readonly groupRepository: GroupsRepository) {}

  async getGroupMessages(groupId: string, userId: string) {
    const group = await this.groupRepository.findGroupById(groupId);
    if (!group) {
      throw new Error('Group not found');
    }

    if (!group.members.includes(userId as any)) {
      throw new Error('Access denied. You are not a member of this group.');
    }

    const messages = await this.messageRepository.findMessagesByGroupId(groupId);
    return messages;
  }
}
