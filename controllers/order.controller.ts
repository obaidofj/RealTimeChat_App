import { Request, Response } from 'express';
import { Order } from '../db/entities/order.entity.js';
import { User } from '../db/entities/user.entity.js';
import { Product } from '../db/entities/product.entity.js';
import { validateNotEmptyFields } from '../utils/validationUtils.js';
import { In} from 'typeorm';
import { OrderProduct } from '../db/entities/orderProducts.entity.js';
import { plainToClass } from 'class-transformer';

export const orderController = {
  // Create an order
  async createOrder(req: Request, res: Response) {
    try {


       const { products, userId } = req.body;

      const isValid=validateNotEmptyFields ([ 'userId' , 'products'  ],req,res);
       
      if(Object.keys(isValid).length !==0)
        return res.status(404).json(isValid);
      
       // Calculate the total price and total quantity
       let orderTotal = 0;
       let orderTotalQuantity = 0;

          const productIds = products.map((product) => product.id);
      
          // Ensure that product IDs exist in the database
          const existingProducts = await Product.find({ where: { id: In(productIds) }});
      
          // Check if all products are found in the database
          if (existingProducts.length !== productIds.length) {
            return res.status(400).json({ error: 'One or more product IDs do not exist.' });
          }
      
      
      
  // Create OrderProducts to associate products with quantities and update totals
  const orderProducts = products.map((product) => {
    const existingProduct = existingProducts.find((p) => p.id === product.id);

    const orderProduct = new OrderProduct();
    orderProduct.product = existingProduct;
    orderProduct.quantity = product.quantity;

    orderTotal += existingProduct.price * product.quantity;
    orderTotalQuantity += product.quantity;

    return orderProduct;
  });
       
        
          const orderUser = userId;
         
      
          const order = await Order.create({

            orderProducts:  orderProducts,
            totalQuantity : orderTotalQuantity,
            totalPrice : orderTotal,
            user : userId 

           }).save(); // Use the repository to save the order

          return res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' + error});
    }
  },

  // Get order information
  async getOrderInfo(req: Request, res: Response) {
    try {
      const orderId = Number(req.params.orderId);

      // Find the order by ID  
      const order = await Order.findOne({ where: {id : orderId},  relations: ['user', 'orderProducts'] });

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
// Use class-transformer to exclude the password property from the User entity
const orderWithExcludedPassword = plainToClass(Order, order, {
  excludeExtraneousValues: true,
});
      return res.status(200).json({ order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
