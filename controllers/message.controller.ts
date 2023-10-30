import { Request, Response } from 'express';
import { Message } from '../db/entities/messege.entity.js';
import { User } from '../db/entities/user.entity.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import upload from '../middlewares/multerconfig.js';
import { connectedUsers, findUsernameBySocketId  } from '../sockets/socketHandler.js';
import { io } from '../app.js';
import AWS from 'aws-sdk';

export const messageController = {
  // Send a message
  async sendMessage(req: Request, res: Response) {


    try {
      let { senderId, receiverId, text } = req.body;

      const senderIdNum = parseInt(senderId);
      // Check if sender and receiver users exist
      const sender = await User.findOne({ where: { id: senderId } });
      const receiver = await User.findOne({ where: { id: receiverId } });

      if (!sender || !receiver) {
        return res.status(404).json({ message: 'Sender or receiver not found' });
      }

    

      // Access the uploaded files from req.files
      const uploadedFiles = req.files as Express.Multer.File[] || [];
      let notUploadedFiles = [];
      let attachmentsUrls: string[] = [];

      // Create an array to track which files were successfully uploaded
      uploadedFiles?.map((file, index) => {
        if (file) {
          attachmentsUrls.push(file.filename)
        } else {
          notUploadedFiles.push(file.originalname)
        }
      });
      
      const s3 = new AWS.S3();
      
 
      if ( !!req.files?.length  && (req.files?.length !== attachmentsUrls.length)) {
        const filesMessege = "Some files are not uploaded due to size limit or another error , max file size is 12MB"
      }
    // Access sender's and receiver's session data
    const senderSessionData = {
      username: (req.session as SessionData).username,
      userId: (req.session as SessionData).userId,
    };
    const receiverSessionData = {
      username: receiver.username, 
      userId: receiver.id,
      };
      
    // Find the receiver's socket ID based on their username
      const receiverSocketId = findUsernameBySocketId(receiverSessionData.username);
      
      
      const messegeUserAndFiles={"text": text, "files":attachmentsUrls ,"user":{"username":senderSessionData.username,"userId":senderSessionData.userId}};
       // Emit the message to the receiver's socket
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('message', messegeUserAndFiles);
    }

      
      // Create a new message
      // if (req.file) {
      const message = await Message.create({
        text,
        attachmentsUrls,
        sender,
        receiver,
      });

      await message.save();
      // Retrieve the 'username' and 'userId' properties from sessionData
      const sessionData = {
        username: (req.session as unknown as { username: string }).username,
        userId: (req.session as unknown as { userId: number }).userId,
      };

      return res.status(201).json({ info: 'Message sent successfully', message, sessionData: sessionData, });
      // }
      // else
      //  return res.status(400).json({ info: 'there was error in uploading fiel' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
 async sendMessageS3(req: Request, res: Response) {


    try {
      let { senderId, receiverId, text } = req.body;

      const senderIdNum = parseInt(senderId);
      // Check if sender and receiver users exist
      const sender = await User.findOne({ where: { id: senderId } });
      const receiver = await User.findOne({ where: { id: receiverId } });

      if (!sender || !receiver) {
        return res.status(404).json({ message: 'Sender or receiver not found' });
      }

  

      // Access the uploaded files from req.files
      const uploadedFiles = req.files as Express.Multer.File[] || [];
      let notUploadedFiles = [];
      let attachmentsUrls: string[] = [];

      // Create an array to track which files were successfully uploaded
      uploadedFiles?.map((file, index) => {
        if (file) {
          attachmentsUrls.push(file.filename)
        } else {
          notUploadedFiles.push(file.originalname)
        }
      });
      
     
 

      if ( !!req.files?.length  && (req.files?.length !== attachmentsUrls.length)) {
        const filesMessege = "Some files are not uploaded due to size limit or another error , max file size is 12MB"
      }
    // Access sender's and receiver's session data
    const senderSessionData = {
      username: (req.session as SessionData).username,
      userId: (req.session as SessionData).userId,
    };
    const receiverSessionData = {
      username: receiver.username, 
      userId: receiver.id,
      };
      
    // Find the receiver's socket ID based on their username
      const receiverSocketId = findUsernameBySocketId(receiverSessionData.username);
      
      
      const messegeUserAndFiles={"text": text, "files":attachmentsUrls ,"user":{"username":senderSessionData.username,"userId":senderSessionData.userId}};
       // Emit the message to the receiver's socket
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('message', messegeUserAndFiles);
    }

      
      // Create a new message
      // if (req.file) {
      const message = await Message.create({
        text,
        attachmentsUrls,
        sender,
        receiver,
      });

      await message.save();
      // Retrieve the 'username' and 'userId' properties from sessionData
      const sessionData = {
        username: (req.session as unknown as { username: string }).username,
        userId: (req.session as unknown as { userId: number }).userId,
      };

      return res.status(201).json({ info: 'Message sent successfully', message, sessionData: sessionData, });
      // }
      // else
      //  return res.status(400).json({ info: 'there was error in uploading fiel' });
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
          { senderid: Number(userId1), receiverid: Number(userId2) },
          { senderid: Number(userId2), receiverid: Number(userId1) },
        ],
      });

      return res.status(200).json({ messages });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' + error });
    }
  },
};
