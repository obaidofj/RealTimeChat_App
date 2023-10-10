import express from 'express';
import { connectionFriendshipController } from '../controllers/connectionFriendshipController';
const router = express.Router();
// Route for sending a friend request
router.post('/send', connectionFriendshipController.sendFriendRequest);
// Route for accepting a friend request
router.post('/accept', connectionFriendshipController.acceptFriendRequest);
// Route for getting user connections (friends)
router.get('/user/:userId', connectionFriendshipController.getUserConnections);
export default router;
//# sourceMappingURL=connectionFriendship.routes.js.map