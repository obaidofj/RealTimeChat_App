import { Request, Response } from 'express';
import { Message } from '../db/entities/messege.entity.js';
import { User } from '../db/entities/user.entity.js';
import { MessegeType } from '../types/messege.types.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import upload from '../middlewares/multerConfig.js';


export const messageController = {
  // Send a message
  async sendMessage(req: Request, res: Response) {


    try {
      let { senderId, receiverId, content ,type } = req.body;

      const senderIdNum=parseInt(senderId);
      // Check if sender and receiver users exist
      const sender = await User.findOne({ where: {id:senderId}});
      const receiver = await User.findOne({ where:{ id:receiverId}});

      if (!sender || !receiver) {
        return res.status(404).json({ message: 'Sender or receiver not found' });
      }

      // if(req.file)
      
      if(type==MessegeType.ATTACHMENT)
      content=req.file.destination + req.file.filename;

      // res.send({
      //   message: 'File Uploaded Successfully!',
      //   file: fileURL
      // });

      // Create a new message
      if (req.file) {
      const message = await Message.create({
        sender,
        receiver,
        content,
        type:MessegeType[type]
      });
       
      await message.save()

      return res.status(201).json({ info: 'Message sent successfully', message });
    }
    else
     return res.status(400).json({ info: 'there was error in uploading fiel' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get messages between two users
  async getMessages(req: Request, res: Response) {
    try {
      const { userId1, userId2 } = req.params;

      // Find messages between the two users
      const messages = await Message.find({
        where: [
          { senderid : userId1, receiverid: userId2 },
          { senderid : userId2, receiverid: userId1 },
        ],
      });

      return res.status(200).json({ messages });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error'+error });
    }
  },
};
