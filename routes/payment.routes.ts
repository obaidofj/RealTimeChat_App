// @ts-nocheck
import express from 'express';
import { paymentController } from '../controllers/payment.controller.js';

const router = express.Router();

// Route for creating a payment transaction
router.post('/create', paymentController.createPayment);

// Route for getting a user's payment transactions
router.get('/user/:userId', paymentController.getUserPayments);

export default router;




