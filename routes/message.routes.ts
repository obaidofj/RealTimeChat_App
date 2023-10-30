import express from 'express';
import { messageController } from '../controllers/message.controller.js';
import upload from '../middlewares/multerconfig.js';
import s3Upload from '../middlewares/multerconfigS3.js';

const router = express.Router();

// Route for sending a message
router.post('/', upload.array('files'), messageController.sendMessage);
router.post('/s3', s3Upload.array('files'), messageController.sendMessageS3);

// Route for retrieving  messages between two users
router.get('/:userId1/:userId2', messageController.getMessages);

// // Route for retrieving sent messages from user
// router.get('/:userId1/:userId2', messageController.getSentMessages);

// // Route for retrieving messages recived messeg to user
// router.get('/:userId1/:userId2', messageController.getRecivedMessages);

export default router;
