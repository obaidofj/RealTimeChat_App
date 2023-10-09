import { PaymentTransaction } from '../db/entities/paymentTransaction.entity.js';
import { User } from '../db/entities/user.entity.js';
export const paymentController = {
    // Create a payment transaction
    async createPayment(req, res) {
        try {
            const { userId, amount, currency } = req.body;
            // Find the user by ID
            const user = await User.findOne(userId);
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
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    // Get a user's payment transactions
    async getUserPayments(req, res) {
        try {
            const userId = req.params.userId;
            // Find the user by ID
            const user = await User.findOne(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Get the user's payment transactions
            const payments = await PaymentTransaction.find({ where: { user } });
            return res.status(200).json({ payments });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};
//# sourceMappingURL=payment.controller.js.map