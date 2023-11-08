// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/authentication.js';

const router = express.Router();


router.post('/profile/', authenticate, userController.insertProfile);

// Route for retrieving user profile
router.get('/profile/id/:userId', authenticate, userController.getUserProfileByID);

router.get('/profile/name/:userName', authenticate, userController.getUserProfileByUserName);

router.get('/search/:userName', authenticate, userController.searchUserNames);

export default router