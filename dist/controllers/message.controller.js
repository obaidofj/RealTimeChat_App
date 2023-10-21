import { Message } from '../db/entities/messege.entity.js';
import { User } from '../db/entities/user.entity.js';
export const messageController = {
    // Send a message
    async sendMessage(req, res) {
        try {
            const { senderId, receiverId, text } = req.body;
            // Check if sender and receiver users exist
            const sender = await User.findOne(senderId);
            const receiver = await User.findOne(receiverId);
            if (!sender || !receiver) {
                return res.status(404).json({ message: 'Sender or receiver not found' });
            }
            // Create a new message
            // @ts-ignore
            const message = await Message.create({
                sender,
                receiver,
                text,
            });
            // @ts-ignore
            return res.status(201).json({ message: 'Message sent successfully', message });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    // Get messages between two users
    async getMessages(req, res) {
        try {
            const { userId1, userId2 } = req.params;
            // Find messages between the two users
            const messages = await Message.find({
                where: [
                    { sender: userId1, receiver: userId2 },
                    // @ts-ignore
                    { sender: userId2, receiver: userId1 },
                ],
            });
            return res.status(200).json({ messages });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};
//# sourceMappingURL=message.controller.js.map