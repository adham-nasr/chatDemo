import { GroupRepository } from '../repositories/group.repository.js';
import { Types } from 'mongoose';
const groupRepository = new GroupRepository();
export const createGroupService = async (data, userId) => {
    const existingGroup = await groupRepository.findGroupByName(data.name);
    if (existingGroup) {
        throw new Error('Group name is already taken');
    }
    const groupData = {
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
export const getGroupsService = async (userId) => {
    const groups = await groupRepository.findGroupsByUserId(userId);
    return groups;
};
export const joinGroupService = async (groupName, userId) => {
    const group = await groupRepository.findGroupByName(groupName);
    if (!group) {
        throw new Error('Group not found');
    }
    const isMember = group.members.some((memberId) => memberId.toString() === userId);
    if (isMember) {
        throw new Error('User is already a member of this group');
    }
    const updatedGroup = await groupRepository.addMemberToGroup(group._id.toString(), userId);
    return updatedGroup;
};
//# sourceMappingURL=group.service.js.map