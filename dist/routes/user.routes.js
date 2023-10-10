import express from 'express';
import { userController } from '../controllers/user.controller.js';
const router = express.Router();
// Route for user registration
router.post('/register', userController.register);
// Route for user login
router.post('/login', userController.login);
// Route for retrieving user profile
router.get('/profile/:userId', userController.getUserProfile);
router.post('/logout', userController.logout);
router.post('/assignrole', userController.assignRoleToUser);
router.post('/verify', userController.verify);
export default router;
//# sourceMappingURL=user.routes.js.map