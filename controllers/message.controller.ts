// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import { Request, Response } from 'express';
import { Message } from '../db/entities/messege.entity.js';
import { User } from '../db/entities/user.entity.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import upload from '../middlewares/multerconfig.js';
import axios from 'axios';


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

      // if(req.file)

      // if(type==MessegeType.ATTACHMENT)
      // attachmentsUrls=req.file.destination + req.file.filename;

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


      if (!!req.files?.length && (req.files?.length !== attachmentsUrls.length)) {
        const filesMessege = "Some files are not uploaded due to size limit or another error , max file size is 12MB"
      }

      // if (req.files && req.files.length === 0) {
      //   // No files were uploaded.
      //   res.status(400).json('No files were uploaded.');
      //   // return;
      // }
      // res.send({
      //   message: 'File Uploaded Successfully!',
      //   file: fileURL
      // });

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

  async say(req, res) {
    try {
      const userMessage = req.body.message; // Assuming the question is passed in the request body

      // Create a message payload for the ChatGPT API
      const payload = {
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userMessage },
        ],
        model: 'gpt-3.5-turbo',
      };

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        payload,
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const answer = response.data.choices[0].message.content;

      res.json({ "answer": answer });
    } catch (err) {
      // console.error(error);
      if (err.response.data)
      console.error(err.response.data);
      res.status(500).json({ error: 'An error occurred while processing your request' });
    }
  },


};
