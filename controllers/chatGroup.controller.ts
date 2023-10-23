import { Request, Response } from 'express';
import { ChatGroup } from '../db/entities/chatGroup.entity.js';
import { User } from '../db/entities/user.entity.js';
import { validateNotEmptyFields } from '../utils/validationUtils.js';
import { In} from 'typeorm';

export const chatgroupController = {
  // Create a chat group
  async createChatGroup(req: Request, res: Response) {
    try {
      const { name, userIds } = req.body;
      
      const isValid=validateNotEmptyFields ([ 'name' , 'userIds' ],req,res);
       
      if(Object.keys(isValid).length !==0)
        return res.status(404).json(isValid);

      // Find the users by IDs
      const users = await User.find({
        where: {
          id: In(userIds),
        },
      });

      if (users.length !== userIds.length) {
        return res.status(400).json({ message: 'One or more users not found' });
      }
 
      // Create a new chat group
      const chatGroup = await ChatGroup.create({
        name,
        users: users,
      }).save();

      return res.status(201).json({ message: 'Chat group created successfully', chatGroup });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }, 

  // Get information about a chat group
  async getChatGroupInfo(req: Request, res: Response) {
    try {
      const groupId = Number(req.params.groupId);

      // Find the chat group by ID
      const chatGroup = await ChatGroup.findOne({where : {id : groupId} , relations: ['users'] });

      if (!chatGroup) {
        return res.status(404).json({ message: 'Chat group not found' });
      }

      return res.status(200).json({ chatGroup });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
