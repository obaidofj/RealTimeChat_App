import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/authentication.js';

const router = express.Router();

// Route for user registration
router.post('/register',   authController.register);

// Route for user login
router.post('/login', authController.login);

router.post('/logout', authenticate , authController.logout);

router.post('/assignrole', authenticate ,authController.assignRoleToUser );

router.post('/verify',  authController.verify );


export default router;
