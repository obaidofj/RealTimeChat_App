// @ts-nocheck
import express from 'express';
import { messageController } from '../controllers/message.controller.js';
import upload from '../middlewares/multerconfig.js';

const router = express.Router();

// Route for sending a message
router.post('/', upload.array('files'), messageController.sendMessage);

router.post('/', upload.array('files'), messageController.sendMessage);

// Route for retrieving  messages between two users
router.post('/say', messageController.say);

// // Route for retrieving sent messages from user
// router.get('/:userId1/:userId2', messageController.getSentMessages);

// // Route for retrieving messages recived messeg to user
// router.get('/:userId1/:userId2', messageController.getRecivedMessages);

export default router;
