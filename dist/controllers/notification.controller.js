import { Notification } from '../db/entities/notification.entity.js';
import { User } from '../db/entities/user.entity.js';
export const notificationController = {
    // Create a notification
    async createNotification(req, res) {
        try {
            const { userId, message } = req.body;
            // Find the user by ID
            const user = await User.findOne(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Create a new notification
            const notification = await Notification.create({
                recipient: user,
                message,
            });
            return res.status(201).json({ message: 'Notification created successfully', notification });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    // Get all notifications for a user
    async getUserNotifications(req, res) {
        try {
            const userId = req.params.userId;
            // Find the user by ID
            const user = await User.findOne(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Get all notifications for the user
            const notifications = await Notification.find({ where: { recipient: user } });
            return res.status(200).json({ notifications });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};
//# sourceMappingURL=notification.controller.js.map