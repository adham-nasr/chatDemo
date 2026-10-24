import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IGroup } from './schemas/Group';

@Injectable()
export class GroupsRepository {

  constructor( @InjectModel('group')
      private readonly Group: Model<IGroup>){}
      
  async createGroup(groupData: Partial<IGroup>): Promise<IGroup> {
    return await this.Group.create(groupData);
  }

  async findGroupsByUserId(userId: string): Promise<IGroup[]> {
    return await this.Group.find({ members: new Types.ObjectId(userId) });
  }

  async findGroupById(groupId: string): Promise<IGroup | null> {
    return await this.Group.findById(groupId);
  }

  async findGroupByName(name: string): Promise<IGroup | null> {
    return await this.Group.findOne({ name });
  }

  async addMemberToGroup(groupId: string, userId: string): Promise<IGroup | null> {
    return await this.Group.findByIdAndUpdate(
      groupId,
      { $addToSet: { members: new Types.ObjectId(userId) } },
      { new: true }
    );
  }
}
