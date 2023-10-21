import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/authentication.js';

const router = express.Router();

// Route for user registration
router.post('/register',   userController.register);

// Route for user login
router.post('/login', userController.login);

router.post('/profile/', authenticate , userController.insertProfile);

// Route for retrieving user profile
router.get('/profile/id/:userId', authenticate ,userController.getUserProfileByID);

router.get('/profile/name/:userName', authenticate ,userController.getUserProfileByUserName);

router.post('/logout', authenticate , userController.logout);

router.post('/assignrole', authenticate ,userController.assignRoleToUser );

router.post('/verify',  userController.verify );


export default router;
