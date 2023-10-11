import express from 'express';
import { messageController } from '../controllers/message.controller.js';

const router = express.Router();

// Route for sending a message
router.post('/', messageController.sendMessage);

// Route for retrieving messages between two users
router.get('/:userId1/:userId2', messageController.getMessages);

export default router;
