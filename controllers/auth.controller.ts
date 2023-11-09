// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import { Request, Response } from 'express';
import { User } from '../db/entities/user.entity.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verify } from '../middlewares/authentication.js';
import connection from '../db/connection.js';
import { EntityManager } from 'typeorm';
import { Profile } from '../db/entities/profile.entity.js';
import { UserTypes } from '../types/user.types.js';
import { AppTypes } from "../types/app.types.js";
// import { Session } from 'express-session';
import { MoreThan } from 'typeorm';
import { v4 as uuidv4 } from "uuid";
import ses from "../utils/configAws.js";

  
 
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

      // Create a new object without the password
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;

      return res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
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
      // const user = await User.findOne({ where: { username } , addSelect:(password)});
      const user = await User.findOne({ where: { username }, select: ['id', 'username', 'email', 'password'] });


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
          username: user.username,
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
      (req.session as unknown as Session & { username: string }).username = user.username,
        (req.session as unknown as Session & { userId: number }).userId = user.id;

      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Route to check the session based on the token
  // async checkSession (req, res)  {
  //   const sessionToken = req.headers.authorization.split('Bearer ')[1]; // Extract the token from the header

  //   // Validate the token and look up the user's session
  //   if (isValidToken(sessionToken)) {
  //     const userSession = getSessionData(sessionToken); // Implement this function to get the user's session data

  //     if (userSession) {
  //       // Continue the user's session
  //       req.session.userId = userSession.userId;
  //       res.json({ success: true });
  //     } else {
  //       res.status(401).json({ error: 'Invalid token' });
  //     }
  //   } else {
  //     res.status(401).json({ error: 'Invalid token' });
  //   }
  // },


  // logout of user
// User logout
async logout(req: Request, res: Response) {
  try {
    // Clear cookies
    res.clearCookie('username');
    res.clearCookie('loginTime');
    res.clearCookie('token');

    // Clear session
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      return res.status(200).json({ message: 'Logout successful' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
},

// Reset password
async resetPassword(req: Request, res: Response) {
  try {
    const { username, newPassword } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's password with the new one (make sure to hash it)
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  },






// Reset password request
  async resetPasswordRequest(req: Request, res: Response) {
    // Generate a unique token for password reset link
    const generateResetToken = () => uuidv4();
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset token
    const resetToken = generateResetToken();

    // Save the reset token and expiration time in the database
    user.resetToken = resetToken;
    user.resetTokenExpiration = new Date(Date.now() + 3600000 * 4); // Reset link valid for 4 hours
    await user.save();

    // Send password reset email
    const resetLink = `https://localhost:5000/resetPasswordWithToken/${resetToken}`;
    const emailParams = { Destination: { ToAddresses: [email] }, Message: { Body: { Html: { Data: `  <h2>Hi ${user.username},</h2>
  <p>You have requested to reset your password. Click the link below to set a new password:</p>
  <p> Click the following link : <a href="${resetLink}" target="_blank">Reset Password</a></p>

  <p>If you didn't request this reset, please ignore this email.</p>

  <p>Best regards,<br>
  Faceingoff Chat App Team</p> ` }, Text: { Data: `  Hi ${user.username},\n
  You have requested to reset your password. Click the link below to set a new password:\n
   Click the following link : ${resetLink}\n

  \nIf you didn't request this reset, please ignore this email.

  \nBest regards,\n
  Faceingoff Chat App Team\n ` } }, Subject: { Data: "Password Reset Request" } }, Source: "obaidofj2@gmail.com" };

    // await ses.sendEmail(emailParams).promise();
    ses.sendEmail(emailParams, (err, data) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent successfully:", data.MessageId);
      }
    });

    return res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
},

// Reset password with token
async resetPasswordWithToken(req: Request, res: Response) {
  try {
    const { resetToken } = req.params;
    const { newPassword } = req.body;

    // Check if the token is valid and not expired
    const user = await User.findOne({
      where: {
        resetToken,
        resetTokenExpiration: MoreThan ( new Date() ),
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Update the user's password with the new one (make sure to hash it)
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear the reset token and expiration time
    user.resetToken = null;
    user.resetTokenExpiration = null;

    await user.save();

    return res.status(200).json({ message: 'The Password reset is successful' });
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

      // return res.status(201).send(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

};
