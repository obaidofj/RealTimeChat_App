// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import express from 'express';
import { messageController } from '../controllers/message.controller.js';
import upload from '../middlewares/multerconfig.js';

const router = express.Router();

// Route for sending a message
router.post('/', upload.array('files'), messageController.sendMessage);

router.post('/', upload.array('files'), messageController.sendMessage);

// Route for chatgpt
router.post('/say', messageController.say);


// Route for retrieving sent messages from user to user
router.get('/sent/:userId1/:userId2', messageController.getSentMessages);

// Route for retrieving messages recived from a user to user
router.get('/recived/:userId1/:userId2', messageController.getRecivedMessages);

// Route to Search in messeges sent or recived of a user
router.get('/search/:userId1/:userId2/:msg', messageController.searchMessages);

export default router;
