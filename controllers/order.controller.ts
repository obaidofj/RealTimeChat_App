import { Request, Response } from 'express';
import { Order } from '../db/entities/order.entity.js';
import { User } from '../db/entities/user.entity.js';
import { Product } from '../db/entities/product.entity.js';
import { validateNotEmptyFields } from '../utils/validationUtils.js';

export const orderController = {
  // Create an order
  async createOrder(req: Request, res: Response) {
    try {
      const { userId, productId, quantity } = req.body;

      
      const isValid=validateNotEmptyFields ([ 'userId' , 'productId' , 'quantity' ],req,res);
       
      if(Object.keys(isValid).length !==0)
        return res.status(404).json(isValid);
      
      // Find the user and product by IDs
      const user = await User.findOne( { where: {id : userId}});
      const product = await Product.findOne( { where: {id : productId}});

      if (!user || !product) {
        return res.status(404).json({ message: 'User or product not found' });
      }

      // Calculate the total price based on product price and quantity
      const totalPrice = product.price * quantity;

      // Create a new order
      const order = await Order.create({
        user,
        product,
        quantity,
        totalPrice,
      });

      return res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get order information
  async getOrderInfo(req: Request, res: Response) {
    try {
      const orderId = req.params.orderId;

      // Find the order by ID  
      const order = await Order.findOne({ where: {id : orderId},  relations: ['user', 'product'] });

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      return res.status(200).json({ order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
