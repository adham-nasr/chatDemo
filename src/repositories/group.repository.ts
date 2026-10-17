import { Group, type IGroup } from '../models/Group.js';
import { Types } from 'mongoose';

export class GroupRepository {
  async createGroup(groupData: Partial<IGroup>): Promise<IGroup> {
    return await Group.create(groupData);
  }

  async findGroupsByUserId(userId: string): Promise<IGroup[]> {
    return await Group.find({ members: new Types.ObjectId(userId) });
  }

  async findGroupById(groupId: string): Promise<IGroup | null> {
    return await Group.findById(groupId);
  }

  async findGroupByName(name: string): Promise<IGroup | null> {
    return await Group.findOne({ name });
  }

  async addMemberToGroup(groupId: string, userId: string): Promise<IGroup | null> {
    return await Group.findByIdAndUpdate(
      groupId,
      { $addToSet: { members: new Types.ObjectId(userId) } },
      { new: true }
    );
  }
}
