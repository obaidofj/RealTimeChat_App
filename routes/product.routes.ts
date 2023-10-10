import express from 'express';
import { productController } from '../controllers/productController';

const router = express.Router();

// Route for creating a product
router.post('/create', productController.createProduct);

// Route for getting all products
router.get('/all', productController.getAllProducts);

export default router;
