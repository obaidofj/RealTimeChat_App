// @ts-nocheck
import express from 'express';
import { connectionFriendshipController } from '../controllers/connectionFriendship.controller.js';

const router = express.Router();

// Route for sending a friend request
router.post('/send', connectionFriendshipController.sendFriendRequest);

// Route for accepting a friend request
router.post('/accept', connectionFriendshipController.acceptFriendRequest);

router.post('/reject', connectionFriendshipController.rejectFriendRequest);

router.post('/remove', connectionFriendshipController.removeFriendeship);

// Route for getting user connections (friends)
router.get('/user/:userId', connectionFriendshipController.getUserConnections);

export default router;
