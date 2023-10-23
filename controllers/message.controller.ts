import { Request, Response } from 'express';
import { Message } from '../db/entities/messege.entity.js';
import { User } from '../db/entities/user.entity.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import upload from '../middlewares/multerconfig.js';


export const messageController = {
  // Send a message
  async sendMessage(req: Request, res: Response) {


    try {
      let { senderId, receiverId, text  } = req.body;

      const senderIdNum=parseInt(senderId);
      // Check if sender and receiver users exist
      const sender = await User.findOne({ where: {id:senderId}});
      const receiver = await User.findOne({ where:{ id:receiverId}});

      if (!sender || !receiver) {
        return res.status(404).json({ message: 'Sender or receiver not found' });
      }
 
      // if(req.file)
      
      // if(type==MessegeType.ATTACHMENT)
      // attachmentsUrls=req.file.destination + req.file.filename;
  
      // Access the uploaded files from req.files
  const uploadedFiles = req.files;
  let notUploadedFiles=[];
  let attachmentsUrls:string[]=[];

  // Create an array to track which files were successfully uploaded
  // uploadedFiles?.map((file, index) => {
  //   if (file) {
  //     attachmentsUrls.push(file.filename)
  //   } else {
  //     notUploadedFiles.push(file.originalname)
  //   }
  // });
  if (Array.isArray(uploadedFiles)) {
    uploadedFiles.map((file, index) => {
      if (file) {
        attachmentsUrls.push(file.filename);
      } else {
        notUploadedFiles.push(file.originalname);
      }
    });
  } else {
    // Handle the case where uploadedFiles is not an array
  }
  

      
      if(req.files?.length > 0 && (req.files?.length !== attachmentsUrls.length ))
      {
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
       
      await message.save()

      return res.status(201).json({ info: 'Message sent successfully', message });
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
