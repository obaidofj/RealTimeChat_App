import { Request, Response } from 'express';
import { MuteBlockUser } from '../db/entities/muteBlockUser.entity.js';
import { User } from '../db/entities/user.entity.js';

export const muteBlockUserController = {
  // Mute a user
  async muteUser(req: Request, res: Response) {
    try {
      const { userId, targetUserId } = req.body;

      // Find the user and target user by IDs
      const user = await User.findOne(userId);
      const targetUser = await User.findOne(targetUserId);

      if (!user || !targetUser) {
        return res.status(404).json({ message: 'User or target user not found' });
      }

      // Check if the user is already muted
      const existingMute = await UserMuteBlock.findOne({ user, targetUser, mute: true });

      if (existingMute) {
        return res.status(400).json({ message: 'User is already muted' });
      }

      // Create a new mute record
      const mute = await UserMuteBlock.create({
        user,
        targetUser,
        mute: true,
      });

      return res.status(201).json({ message: 'User muted successfully', mute });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Unmute a user
  async unmuteUser(req: Request, res: Response) {
    try {
      const { userId, targetUserId } = req.body;

      // Find the user and target user by IDs
      const user = await User.findOne(userId);
      const targetUser = await User.findOne(targetUserId);

      if (!user || !targetUser) {
        return res.status(404).json({ message: 'User or target user not found' });
      }

      // Check if the user is currently muted
      const existingMute = await UserMuteBlock.findOne({ user, targetUser, mute: true });

      if (!existingMute) {
        return res.status(400).json({ message: 'User is not muted' });
      }

      // Remove the mute record
      await existingMute.remove();

      return res.status(200).json({ message: 'User unmuted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Block a user
  async blockUser(req: Request, res: Response) {
    try {
      const { userId, targetUserId } = req.body;

      // Find the user and target user by IDs
      const user = await User.findOne(userId);
      const targetUser = await User.findOne(targetUserId);

      if (!user || !targetUser) {
        return res.status(404).json({ message: 'User or target user not found' });
      }

      // Check if the user is already blocked
      const existingBlock = await UserMuteBlock.findOne({ user, targetUser, block: true });

      if (existingBlock) {
        return res.status(400).json({ message: 'User is already blocked' });
      }

      // Create a new block record
      const block = await UserMuteBlock.create({
        user,
        targetUser,
        block: true,
      });

      return res.status(201).json({ message: 'User blocked successfully', block });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Unblock a user
  async unblockUser(req: Request, res: Response) {
    try {
      const { userId, targetUserId } = req.body;

      // Find the user and target user by IDs
      const user = await User.findOne(userId);
      const targetUser = await User.findOne(targetUserId);

      if (!user || !targetUser) {
        return res.status(404).json({ message: 'User or target user not found' });
      }

      // Check if the user is currently blocked
      const existingBlock = await UserMuteBlock.findOne({ user, targetUser, block: true });

      if (!existingBlock) {
        return res.status(400).json({ message: 'User is not blocked' });
      }

      // Remove the block record
      await existingBlock.remove();

      return res.status(200).json({ message: 'User unblocked successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get user's mute and block lists
  async getUserLists(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      // Find the user by ID
      const user = await User.findOne(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Get user's mute and block lists
      const muteList = await UserMuteBlock.find({ user, mute: true }, { relations: ['targetUser'] });
      const blockList = await UserMuteBlock.find({ user, block: true }, { relations: ['targetUser'] });

      return res.status(200).json({ muteList, blockList });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
