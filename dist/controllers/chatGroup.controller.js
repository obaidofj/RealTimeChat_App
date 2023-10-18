import { ChatGroup } from '../db/entities/chatGroup.entity.js';
import { User } from '../db/entities/user.entity.js';
export const chatgroupController = {
    // Create a chat group
    async createChatGroup(req, res) {
        try {
            const { name, userIds } = req.body;
            // Find the users by IDs
            const users = await User.findByIds(userIds);
            if (users.length !== userIds.length) {
                return res.status(400).json({ message: 'One or more users not found' });
            }
            // Create a new chat group
            // @ts-ignore
            const chatGroup = await ChatGroup.create({
                name,
                members: users,
            });
            return res.status(201).json({ message: 'Chat group created successfully', chatGroup });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    // Get information about a chat group
    async getChatGroupInfo(req, res) {
        try {
            const groupId = req.params.groupId;
            // Find the chat group by ID
            // @ts-ignore
            const chatGroup = await ChatGroup.findOne(groupId, { relations: ['members'] });
            if (!chatGroup) {
                return res.status(404).json({ message: 'Chat group not found' });
            }
            return res.status(200).json({ chatGroup });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};
//# sourceMappingURL=chatGroup.controller.js.map