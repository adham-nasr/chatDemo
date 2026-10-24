import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsRepository } from './groups.repository';
import { IGroup } from './schemas/Group';
import { Types } from 'mongoose';

@Injectable()
export class GroupsService {

  constructor(private readonly groupRepository: GroupsRepository) {}
  
  async create(createGroupDto: CreateGroupDto, userId: string) {
      const existingGroup = await this.groupRepository.findGroupByName(createGroupDto.name);
  if (existingGroup) {
    throw new Error('Group name is already taken');
  }

  const groupData: Partial<IGroup> = {
    name: createGroupDto.name,
    admin: new Types.ObjectId(userId),
    members: [new Types.ObjectId(userId)],
  };

  if (createGroupDto.description !== undefined) {
    groupData.description = createGroupDto.description;
  }

  const group = await this.groupRepository.createGroup(groupData);
  return group;
};

async getGroupsService(userId: string) {
  const groups = await this.groupRepository.findGroupsByUserId(userId);
  return groups;
}

async joinGroupService(groupName: string, userId: string) {
  const group = await this.groupRepository.findGroupByName(groupName);
  if (!group) {
    throw new Error('Group not found');
  }

  const isMember = group.members.some((memberId) => memberId.toString() === userId);
  if (isMember) {
    throw new Error('User is already a member of this group');
  }

  const updatedGroup = await this.groupRepository.addMemberToGroup(group._id.toString(), userId);
  return updatedGroup;
  }
}
