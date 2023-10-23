import { Request, Response } from 'express';
import { Notification } from '../db/entities/notification.entity.js';
import { User } from '../db/entities/user.entity.js';
import { validateNotEmptyFields } from '../utils/validationUtils.js';

export const notificationController = {
  // Create a notification
  async createNotification(req: Request, res: Response) {
    try {
      const { userId, message } = req.body;

      const isValid=validateNotEmptyFields ([ 'userId' , 'message' ],req,res);
       
      if(Object.keys(isValid).length !==0)
        return res.status(404).json(isValid);

      // Find the user by ID
      const user = await User.findOne( { where: {id : userId}});

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Create a new notification
      const notification = await Notification.create({
        notificationRecipient: user,
        message,
      });

      await notification.save();
      
      return res.status(201).json({ message: 'Notification created successfully', notification });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get all notifications for a user
  async getUserNotifications(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);

      // Find the user by ID
      const user = await User.findOne( { where: {id : userId} });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Get all notifications for the user
      const notifications = user.notifications ; //await Notification.find({ where: { id: userId } });

      return res.status(200).json({ notifications });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
