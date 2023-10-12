import { Message } from '../db/entities/messege.entity.js';
import { User } from '../db/entities/user.entity.js';
export const messageController = {
    // Send a message
    async sendMessage(req, res) {
        try {
            const { senderId, receiverId, text } = req.body;
            const senderIdNum = parseInt(senderId);
            // Check if sender and receiver users exist
            const sender = await User.findOne({ where: { id: senderId } });
            const receiver = await User.findOne({ where: { id: receiverId } });
            if (!sender || !receiver) {
                return res.status(404).json({ message: 'Sender or receiver not found' });
            }
            // Create a new message
            const message = await Message.create({
                sender,
                receiver,
                text,
            });
            await message.save();
            return res.status(201).json({ info: 'Message sent successfully', message });
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
                    { senderid: userId1, receiverid: userId2 },
                    { senderid: userId2, receiverid: userId1 },
                ],
            });
            return res.status(200).json({ messages });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' + error });
        }
    },
};
//# sourceMappingURL=message.controller.js.map