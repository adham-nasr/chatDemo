import { GroupRepository } from '../repositories/group.repository.js';

const groupRepository = new GroupRepository();

export const createGroupService = async (data: { name: string; description?: string }, userId: string) => {
  const group = await groupRepository.createGroup({
    name: data.name,
    description: data.description,
    admin: userId as any,
    members: [userId as any],
  });

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

  if (group.members.includes(userId as any)) {
    throw new Error('User is already a member of this group');
  }

  const updatedGroup = await groupRepository.addMemberToGroup(groupId, userId);
  return updatedGroup;
};
