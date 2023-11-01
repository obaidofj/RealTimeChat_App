// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import express from 'express';
import { productController } from '../controllers/product.controller.js';

const router = express.Router();

// Route for creating a product
router.post('/create', productController.createProduct);
 
// Route for getting all products
router.get('/all', productController.getAllProducts);

router.get('/:prodId', productController.getProductByID);

export default router;
