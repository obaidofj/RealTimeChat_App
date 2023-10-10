import express from 'express';
import { userController } from '../controllers/userController';
const router = express.Router();
// Route for user registration
router.post('/register', userController.register);
// Route for user login
router.post('/login', userController.login);
// Route for retrieving user profile
router.get('/profile/:userId', userController.getUserProfile);
export default router;
//# sourceMappingURL=user.routes.js.map