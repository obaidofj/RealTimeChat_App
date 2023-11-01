// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import express from 'express';
import { chatgroupController } from '../controllers/chatGroup.controller.js';

const router = express.Router();

// Route for creating a chat group
router.post('/create', chatgroupController.createChatGroup);

// Route for getting information about a chat group
router.get('/info/:groupId', chatgroupController.getChatGroupInfo);

export default router;
