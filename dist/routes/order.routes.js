import express from 'express';
import { orderController } from '../controllers/orderController';
const router = express.Router();
// Route for creating an order
router.post('/create', orderController.createOrder);
// Route for getting order information
router.get('/info/:orderId', orderController.getOrderInfo);
export default router;
//# sourceMappingURL=order.routes.js.map