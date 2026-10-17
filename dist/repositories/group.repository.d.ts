import { type IGroup } from '../models/Group.js';
export declare class GroupRepository {
    createGroup(groupData: Partial<IGroup>): Promise<IGroup>;
    findGroupsByUserId(userId: string): Promise<IGroup[]>;
    findGroupById(groupId: string): Promise<IGroup | null>;
    findGroupByName(name: string): Promise<IGroup | null>;
    addMemberToGroup(groupId: string, userId: string): Promise<IGroup | null>;
}
//# sourceMappingURL=group.repository.d.ts.map