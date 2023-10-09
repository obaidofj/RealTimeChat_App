import { Request, Response } from 'express';
import { Product } from '../db/entities/product.entity.js';
import { User } from '../db/entities/user.entity.js';

export const productController = {
  // Create a product
  async createProduct(req: Request, res: Response) {
    try {
      const { userId, name, description, price } = req.body;

      // Find the user by ID
      const user = await User.findOne(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Create a new product
      const product = await Product.create({
        seller: user,
        name,
        description,
        price,
      });

      return res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get all products
  async getAllProducts(req: Request, res: Response) {
    try {
      // Get all products
      const products = await Product.find();

      return res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
