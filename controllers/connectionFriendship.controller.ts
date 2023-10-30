import { Request, Response } from 'express';
import { ConnectionFriendship } from '../db/entities/connectionFriendship.entity.js';
import { User } from '../db/entities/user.entity.js';
import { validateNotEmptyFields } from '../utils/validationUtils.js';
import { connStatus } from '../types/connection.types.js';


export const connectionFriendshipController = {
  // Send a friend request
  async sendFriendRequest(req: Request, res: Response) {
    try {
      const { senderId, receiverId } = req.body;

      const isValid = validateNotEmptyFields(['senderId', 'receiverId'], req, res);

      if (Object.keys(isValid).length !== 0)
        return res.status(404).json(isValid);

      // Check if the sender and receiver users exist
      const sender = await User.findOne({ where: { id: senderId } });
      const receiver = await User.findOne({ where: { id: receiverId } });

      if (!sender || !receiver) {
        return res.status(404).json({ message: 'Sender or receiver not found' });
      }

      const friendConn = await ConnectionFriendship.findOne({ where: { initiatoUserId: senderId, recipientUserId: receiverId } });
      if (friendConn)
        return res.status(200).json({ message: 'Friendship/Connection already sent' });

      // Create a new friend request
      const friendRequest = await ConnectionFriendship.create({
        initiator: sender,
        recipient: receiver,
        status: connStatus.Pending,
      });

      await friendRequest.save();

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

      const isValid = validateNotEmptyFields(['requestId'], req, res);

      if (Object.keys(isValid).length !== 0)
        return res.status(404).json(isValid);

      // Find the friend request by ID
      const friendRequest = await ConnectionFriendship.findOne({ where: { id: requestId } });

      if (!friendRequest) {
        return res.status(404).json({ message: 'Friend request not found' });
      }

      if (friendRequest.status === connStatus.Accepted)
        return res.status(200).json({ message: 'Friend request already accepted' });

      // Update the status of the friend request to 'accepted' or your custom status
      friendRequest.status = connStatus.Accepted;
      await friendRequest.save();

      return res.status(200).json({ message: 'Friend request accepted' });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Accept a friend request
  async rejectFriendRequest(req: Request, res: Response) {
    try {
      const { requestId } = req.body;

      const isValid = validateNotEmptyFields(['requestId'], req, res);

      if (Object.keys(isValid).length !== 0)
        return res.status(404).json(isValid);

      // Find the friend request by ID
      const friendRequest = await ConnectionFriendship.findOne({ where: { id: requestId } });

      if (!friendRequest) {
        return res.status(404).json({ message: 'Friend request not found' });
      }
      if (friendRequest.status === connStatus.Rejected)
        return res.status(200).json({ message: 'Friend request already rejected' });

      // Update the status of the friend request to 'rejected' or your custom status
      friendRequest.status = connStatus.Rejected;
      await friendRequest.save();

      return res.status(200).json({ message: 'Friend request rejected' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async removeFriendeship(req: Request, res: Response) {
    try {
      const { requestId } = req.body;

      const isValid = validateNotEmptyFields(['requestId'], req, res);

      if (Object.keys(isValid).length !== 0)
        return res.status(404).json(isValid);

      // Find the friend request by ID
      const friendRequest = await ConnectionFriendship.findOne({ where: { id: requestId } });

      if (!friendRequest) {
        return res.status(404).json({ message: 'Friend request not found' });
      }
      if (friendRequest.status === connStatus.Removed)
        return res.status(200).json({ message: 'Friendship already removed' });

      // Update the status of the friend request to 'rejected' or your custom status
      friendRequest.status = connStatus.Removed;
      await friendRequest.save();

      return res.status(200).json({ message: 'Friendship removed' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get user connections (friends)
  async getUserConnections(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);

      // const isValid=validateNotEmptyFields ([ 'userId' ],req,res,'params');

      // if(Object.keys(isValid).length !==0)
      //   return res.status(404).json(isValid);

      // Find the user by ID
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Get user connections (friends)
      const connections = await ConnectionFriendship.find({
        where: { initiatoUserId: userId, status: connStatus.Accepted },
        relations: ['initiator'],
      });

      return res.status(200).json({ connections });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
