// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/authentication.js';

const router = express.Router();

// Route for user registration
router.post('/register', authController.register);

// Route for user login
router.post('/login', authController.login);

router.post("/resetPassword", authController.resetPassword);

router.post("/resetPasswordRequest", authController.resetPasswordRequest);

router.post("/resetPasswordWithToken/:resetToken", authController.resetPasswordWithToken);

router.post('/logout', authenticate, authController.logout);

router.post('/assignrole', authenticate, authController.assignRoleToUser);

router.post('/verify', authController.verify);

// router.post('/checkSession',  authController.checkSession );


export default router;
