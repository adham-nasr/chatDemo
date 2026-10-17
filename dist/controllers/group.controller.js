import { createGroupService, getGroupsService, joinGroupService } from '../services/group.service.js';
export const createGroup = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const group = await createGroupService({ name, description }, userId);
        return res.status(201).json({
            message: 'Group created successfully',
            group,
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
export const getGroups = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const groups = await getGroupsService(userId);
        return res.status(200).json({ groups });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
export const joinGroup = async (req, res) => {
    try {
        const groupId = req.params.id;
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const group = await joinGroupService(groupId, userId);
        return res.status(200).json({ message: 'Joined group successfully', group });
    }
    catch (error) {
        return res.status(400).json({ message: error.message || 'Internal server error' });
    }
};
//# sourceMappingURL=group.controller.js.map