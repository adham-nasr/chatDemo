import { getGroupMessagesService } from '../services/message.service.js';
export const getGroupMessages = async (req, res) => {
    try {
        const groupId = req.params.id;
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const messages = await getGroupMessagesService(groupId, userId);
        return res.status(200).json({ messages });
    }
    catch (error) {
        return res.status(400).json({ message: error.message || 'Internal server error' });
    }
};
//# sourceMappingURL=message.controller.js.map