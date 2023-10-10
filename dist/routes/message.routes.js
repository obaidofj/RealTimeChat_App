import express from 'express';
import { messageController } from '../controllers/messageController';
const router = express.Router();
// Route for sending a message
router.post('/send', messageController.sendMessage);
// Route for retrieving messages between two users
router.get('/get/:userId1/:userId2', messageController.getMessages);
export default router;
//# sourceMappingURL=message.routes.js.map