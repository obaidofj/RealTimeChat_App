import { Request, Response } from 'express';
import { ConnectionFriendship } from '../db/entities/connectionFriendship.entity.js';
import { User } from '../db/entities/user.entity.js';

export const connectionFriendshipController = {
  // Send a friend request
  async sendFriendRequest(req: Request, res: Response) {
    try {
      const { senderId, receiverId } = req.body;

      // Check if the sender and receiver users exist
      const sender = await User.findOne(senderId);
      const receiver = await User.findOne(receiverId);

      if (!sender || !receiver) {
        return res.status(404).json({ message: 'Sender or receiver not found' });
      }

      // Create a new friend request
      const friendRequest = await ConnectionFriendship.create({
        // @ts-ignore

        sender,
        receiver,
        status: 'pending', // You can customize statuses as needed
      });

      return res.status(201).json({ message: 'Friend request sent successfully', friendRequest });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Accept a friend request
  async acceptFriendRequest(req: Request, res: Response) {
    try {
      const { requestId } = req.body;

      // Find the friend request by ID
      const friendRequest = await ConnectionFriendship.findOne(requestId);

      if (!friendRequest) {
        return res.status(404).json({ message: 'Friend request not found' });
      }

      // Update the status of the friend request to 'accepted' or your custom status
      // @ts-ignore

      friendRequest.status = 'accepted';
      await friendRequest.save();

      return res.status(200).json({ message: 'Friend request accepted' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get user connections (friends)
  async getUserConnections(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      // Find the user by ID
      // @ts-ignore

      const user = await User.findOne(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Get user connections (friends)
      const connections = await ConnectionFriendship.find({
        // @ts-ignore

        where: { sender: user, status: 'accepted' },
        relations: ['receiver'],
      });

      return res.status(200).json({ connections });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
