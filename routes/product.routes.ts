// @ts-nocheck
import express from 'express';
import { productController } from '../controllers/product.controller.js';

const router = express.Router();

// Route for creating a product
router.post('/create', productController.createProduct);

// Route for getting all products
router.get('/all', productController.getAllProducts);

router.get('/:prodId', productController.getProductByID);

export default router;
