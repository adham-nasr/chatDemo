import { GroupRepository } from '../repositories/group.repository.js';
import { Types } from 'mongoose';
import type { IGroup } from '../models/Group.js';

const groupRepository = new GroupRepository();

export const createGroupService = async (data: { name: string; description?: string }, userId: string) => {
  const groupData: Partial<IGroup> = {
    name: data.name,
    admin: new Types.ObjectId(userId),
    members: [new Types.ObjectId(userId)],
  };

  if (data.description !== undefined) {
    groupData.description = data.description;
  }

  const group = await groupRepository.createGroup(groupData);
  return group;
};

export const getGroupsService = async (userId: string) => {
  const groups = await groupRepository.findGroupsByUserId(userId);
  return groups;
};

export const joinGroupService = async (groupId: string, userId: string) => {
  const group = await groupRepository.findGroupById(groupId);
  if (!group) {
    throw new Error('Group not found');
  }

  const isMember = group.members.some((memberId) => memberId.toString() === userId);
  if (isMember) {
    throw new Error('User is already a member of this group');
  }

  const updatedGroup = await groupRepository.addMemberToGroup(groupId, userId);
  return updatedGroup;
};
