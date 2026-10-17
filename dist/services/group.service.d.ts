export declare const createGroupService: (data: {
    name: string;
    description?: string;
}, userId: string) => Promise<import("../models/Group.js").IGroup>;
export declare const getGroupsService: (userId: string) => Promise<import("../models/Group.js").IGroup[]>;
export declare const joinGroupService: (groupId: string, userId: string) => Promise<import("../models/Group.js").IGroup | null>;
//# sourceMappingURL=group.service.d.ts.map