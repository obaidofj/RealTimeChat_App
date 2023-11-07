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


// Route for retrieving sent messages from user
router.get('/sent/:userId/:msg', messageController.getSentMessages);

// Route for retrieving messages recived messeg to the user
router.get('/recived/:userId/:msg', messageController.getRecivedMessages);

// Route for Search in messeges sent or recived by user
router.get('search/:userId/:msg', messageController.searchMessages);

export default router;
