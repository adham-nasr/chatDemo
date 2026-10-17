import type { IGroup } from '../models/Group.js';
export declare const createGroupService: (data: {
    name: string;
    description?: string;
}, userId: string) => Promise<IGroup>;
export declare const getGroupsService: (userId: string) => Promise<IGroup[]>;
export declare const joinGroupService: (groupName: string, userId: string) => Promise<IGroup | null>;
//# sourceMappingURL=group.service.d.ts.map