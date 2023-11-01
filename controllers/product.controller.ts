// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import { Request, Response } from 'express';
import { Product } from '../db/entities/product.entity.js';
import { User } from '../db/entities/user.entity.js';
import { validateNotEmptyFields } from '../utils/validationUtils.js';
import { } from 'typeorm';

export const productController = {
  // Create a product
  async createProduct(req: Request, res: Response) {
    try {
      const { name, description, price } = req.body;


      const isValid = validateNotEmptyFields(['name', 'price'], req, res);

      if (Object.keys(isValid).length !== 0)
        return res.status(404).json(isValid);

      // Find the user by ID
      // const user = await User.findOne({ where: {id : userId}});

      // if (!user) {
      //   return res.status(404).json({ message: 'User not found' });
      // }

      // Create a new product
      const product = await Product.create({
        name,
        description,
        price: Number(price),
      });

      await product.save();

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

  // Get products by ID
  async getProductByID(req: Request, res: Response) {
    try {
      // Get product by id

      const prodId = Number(req.params.prodId);

      const product = await Product.findOne({ where: { id: prodId } });

      if (!product)
        return res.status(404).json({ message: 'The product is not found' });

      return res.status(200).json({ product });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
