import { Request, Response } from 'express';
import { PaymentTransaction } from '../db/entities/paymentTransaction.entity.js';
import { User } from '../db/entities/user.entity.js';
import { validateNotEmptyFields } from '../utils/validationUtils.js';

export const paymentController = {
  // Create a payment transaction
  async createPayment(req: Request, res: Response) {
    try {
      const { userId, amount, currency } = req.body;
    
      
      const isValid=validateNotEmptyFields ([ 'userId' , 'amount' , 'currency' ],req,res);
       
      if(Object.keys(isValid).length !==0)
        return res.status(404).json(isValid);

      // Find the user by ID
      const user = await User.findOne({ where: {id : userId}});

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Create a new payment transaction
      const payment = await PaymentTransaction.create({
        user,
        amount,
        currency,
      });

      return res.status(201).json({ message: 'Payment created successfully', payment });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get a user's payment transactions
  async getUserPayments(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);

      // Find the user by ID
      const user = await User.findOne({ where: {id : userId}});

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Get the user's payment transactions
      const payments = await PaymentTransaction.find({ where: { id: userId } });

      return res.status(200).json({ payments });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
