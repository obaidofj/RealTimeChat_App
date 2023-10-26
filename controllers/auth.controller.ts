import { Request, Response } from 'express';
import { User } from '../db/entities/user.entity.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verify } from '../middlewares/authentication.js';
import connection from '../db/connection.js';
import { EntityManager } from 'typeorm';
import { Profile } from '../db/entities/profile.entity.js';
import { UserTypes } from '../types/user.types.js';


export const authController = {
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
      // const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = await User.create({
        username,
        password: password,
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
      const token = jwt.sign(
        {
          username: user.username ,
          email: user.email,
        },
        process.env.JWT_SECRET || '',
        {
          expiresIn: "300m"
        }
      );

     
        res.cookie('username', user.username, {
          maxAge: 60 * 60 * 1000
        });
        res.cookie('loginTime', Date.now(), {
          maxAge: 60 * 60 * 1000
        });
        res.cookie('token', token, {
          maxAge: 60 * 60 * 1000
        });
        
        // res.send();

      return res.status(200).json({ message: 'Login successful', token });
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

async assignRoleToUser(req: Request, res: Response) {
  try {
    
    return res.status(201).send(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
},

};
