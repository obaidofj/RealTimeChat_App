import express from 'express';
import { muteBlockUserController } from '../controllers/muteBlockUser.controller.js';
const router = express.Router();
// Route for muting a user
router.post('/mute', muteBlockUserController.muteUser);
// Route for unmuting a user
router.post('/unmute', muteBlockUserController.unmuteUser);
// Route for blocking a user
router.post('/block', muteBlockUserController.blockUser);
// Route for unblocking a user
router.post('/unblock', muteBlockUserController.unblockUser);
// Route for getting user's mute and block lists
router.get('/lists/:userId', muteBlockUserController.getUserLists);
export default router;
//# sourceMappingURL=muteBlockUser.js.map