import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../db/entities/user.entity.js';
const JWT_SECRET = process.env.JWT_SECRET;
export const authController = {
    async register(req, res) {
        try {
            const { username, password } = req.body;
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                username,
                password: hashedPassword,
            });
            return res.status(201).json({ message: 'User registered successfully', user });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Incorrect password' });
            }
            const token = jwt.sign({ userId: user.id }, JWT_SECRET);
            return res.status(200).json({ message: 'Login successful', token });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    async logout(req, res) {
        try {
            return res.status(200).json({ message: 'Logout successful' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};
//# sourceMappingURL=auth.controller.js.map