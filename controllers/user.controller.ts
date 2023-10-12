import { Request, Response } from 'express';
import { User } from '../db/entities/user.entity.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verify } from '../middlewares/authentication.js';

export const userController = {
  // User registration
  async register(req: Request, res: Response) {
    try {
      const { username, password, email } = req.body;

      // Check if the username or email is already taken
      const existingUser = await User.findOne({ where: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = await User.create({
        username,
        password: hashedPassword,
        email,
      });
      await user.save();

      return res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // User login
  async login(req: Request, res: Response) {
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

      // Here you can generate a JWT token for user authentication

      return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Retrieve user profile
  async getUserProfileByID(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);

      // Find the user by ID
      const user = await User.findBy({ id:userId  });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

    // Retrieve user profile by username
    async getUserProfileByUserName(req: Request, res: Response) {
      try {
        const userName = req.params.userName;
  
        // Find the user by ID
        const user = await User.findBy({ username: userName });
  
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        return res.status(200).json({ user });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    },

// logout of user
async logout(req: Request, res: Response) {
  try {
    
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
},

async assignRoleToUser(req: Request, res: Response) {
  try {
    
    return res.status(201).send(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
},

async verify(req: Request, res: Response) {
  try {
    const token = req.body.token;
  if (verify(token)) {
      res.status(200).send({ 'token': true, 'msg': 'The token is right' });
  }
  else {
      res.status(200).send({ 'token': false, 'msg': 'The token is wrong' });
  }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
},




};
