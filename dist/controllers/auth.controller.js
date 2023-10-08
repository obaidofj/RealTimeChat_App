import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../db/entities/user.entity.js';
// Secret key for JWT token
const JWT_SECRET = process.env.JWT_SECRET;
export const authController = {
    // User registration
    async register(req, res) {
        try {
            const { username, password } = req.body;
            // Check if the username is already taken
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create a new user
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
    // User login
    async login(req, res) {
        try {
            const { username, password } = req.body;
            // Find the user by username
            const user = await User.findOne({ where: { username } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Compare the provided password with the hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Incorrect password' });
            }
            // Generate a JWT token
            const token = jwt.sign({ userId: user.id }, JWT_SECRET);
            return res.status(200).json({ message: 'Login successful', token });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    // User logout 
    async logout(req, res) {
        try {
            // to comp.
            return res.status(200).json({ message: 'Logout successful' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};
//# sourceMappingURL=auth.controller.js.map