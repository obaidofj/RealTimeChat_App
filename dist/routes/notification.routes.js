import express from 'express';
import { notificationController } from '../controllers/notification.controller.js';
const router = express.Router();
// Route for creating a notification
router.post('/create', notificationController.createNotification);
// Route for getting all notifications for a user
router.get('/user/:userId', notificationController.getUserNotifications);
export default router;
//# sourceMappingURL=notification.routes.js.map