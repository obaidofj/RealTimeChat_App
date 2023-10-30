import { Request, Response } from 'express';
import { User } from '../db/entities/user.entity.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verify } from '../middlewares/authentication.js';
import connection from '../db/connection.js';
import { EntityManager } from 'typeorm';
import { Profile } from '../db/entities/profile.entity.js';
import { UserTypes } from '../types/user.types.js';


export const userController = {

async insertProfile (req: Request, res: Response )  {
    
  const { id, firstName, lastName, dateOfBirth } = req.body;

  return connection.manager.transaction(async (transaction: EntityManager) => {
      try {
          const user = await User.findOne({ where: { id: Number(id) } });
          if (user) {
              const profile = Profile.create({
                  firstName,
                  lastName,
                  dateOfBirth
              });

              await transaction.save(profile);

              user.profile = profile;
              await transaction.save(user);

              return res.status(200).json({message: 'The Profile created', profile});
          } //end if
          else {
            return res.status(500).json({ message:"this user dose not exist"});

          }
      } catch (error) {
          console.log(error);
          return res.status(500).json({ message:"Something went wrong"});
      }


  });

},

// Retrieve user profile
async getUserProfileByID(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);

    // Find the user by ID
    const user = await User.findBy({ id:userId  });

    if (user.length===0 ) {
      return res.status(404).json({ message: 'User is not found' });
    }
    
   if(user[0].profile?.id)
    return res.status(200).json({ userid: user[0].id, profile:user[0].profile });
  else
    return res.status(404).json({messege:'There is no profile for user :' + user[0].id});
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

      if (user.length===0 ) {
        return res.status(404).json({ message: 'User is not found' });
      }

        if(user[0]?.profile?.id)
      return res.status(200).json({ userid: user[0].id, profile:user[0].profile });
       else
      return res.status(404).json({messege:'There is no profile for user :' + user[0].id});

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

// async assignRoleToUser(req: Request, res: Response) {
//   try {
    
//     return res.status(201).send(data);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// },

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