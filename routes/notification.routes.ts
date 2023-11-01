// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import express from 'express';
import { notificationController } from '../controllers/notification.controller.js';

const router = express.Router();

// Route for creating a notification
router.post('/create', notificationController.createNotification);

// Route for getting all notifications for a user
router.get('/user/:userId', notificationController.getUserNotifications);

export default router;
