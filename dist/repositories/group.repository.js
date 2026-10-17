import { Group } from '../models/Group.js';
import { Types } from 'mongoose';
export class GroupRepository {
    async createGroup(groupData) {
        return await Group.create(groupData);
    }
    async findGroupsByUserId(userId) {
        return await Group.find({ members: new Types.ObjectId(userId) });
    }
    async findGroupById(groupId) {
        return await Group.findById(groupId);
    }
    async findGroupByName(name) {
        return await Group.findOne({ name });
    }
    async addMemberToGroup(groupId, userId) {
        return await Group.findByIdAndUpdate(groupId, { $addToSet: { members: new Types.ObjectId(userId) } }, { new: true });
    }
}
//# sourceMappingURL=group.repository.js.map