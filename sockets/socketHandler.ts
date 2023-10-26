

// Create a new Express app
// const express = require('express');
// const app = express();
import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import http from 'http';
import { User } from '../db/entities/user.entity.js';
import { threadId } from 'worker_threads';
import { MessegeStatus } from '../types/messege.types.js';
import express from 'express';
import { messageController } from '../controllers/message.controller.js';

const socketHandler = (app: http.RequestListener<typeof http.IncomingMessage, typeof http.ServerResponse> | undefined) => {
// Create a new Socket.io server
const server = http.createServer(app);
// const io = new Server(server);
// const server = http.createServer(app);
// const io = require('socket.io')(server, { transports: ['websocket'] });



  // Initialize Socket.io
  const io = new Server(server, { transports: ['websocket'] });

// Create a list to store connected users
const users = [];

// Listen for new connections
io.on('connection', async (socket) => {
  // Add the new user to the list

  const token:string|undefined = ( socket.handshake.headers.cookie?.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1] );
// console.log(socket.handshake.headers.cookie?.split(';').find(c => c.trim().startsWith('token=')));

  // let tokenIsValid = verifyToken(token);
   
  // if (tokenIsValid) {
  const decoded = jwt.decode(token as string) as {username:string};
  const user = await User.findOneBy({ username: decoded?.username || '' });
  // }
// }
const socketId=socket.id;

// console.log(socketId ,'-', token);

users[socketId] = user?.username;

console.log(users);

  // users.push({ toString(socketId) : user?.username});

  //const token = socket.handshake.headers.authorization?.split(' ')[1];

 
  // Listen for messages from the user
  socket.on('message', async (data, callback) => {
    // console.log(socket.handshake.headers.cookie ? socket.handshake.headers.cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1] : null);

      // const username = getusernameBySocketId(socket.id,users);

      //   if (!username) {
      //     // Handle the case where the sender is not found (e.g., session expired)
      //     console.log('user not conected' , users);//throw new Error
      //     return;
      //   }




      


    // Broadcast the message to all connected users
    io.emit('message', data); // do this need to be with db saving ?
  });   

  // Listen for the user disconnecting
  socket.on('disconnect', () => {
    // Remove the user from the list
    users.splice(users.indexOf(socket), 1);
  });
});

// Start the server
// server.listen(3001, () => {
//   console.log('Server listening on port 3001');
// });

return server;

};


function getusernameBySocketId(socketId,users) {
  for (const user of users) {
    if (user.socketId === socketId) {
      return user.name;
    }
  }
  return null;
}

export default socketHandler;




function verifyToken(token: string | undefined) {
  throw new Error('Function not implemented.');
}
// // Create a new Express app
// import express from 'express';
// const app = express();

// // Create a new Socket.io server
// // const http = require('http');
// // const server = http.createServer(app);
// // const io = require('socket.io')(server);
// const socketHandler = (io) => {
// // Create a list to store connected users
// const users = [];

// // Listen for new connections
// io.on('connection', (socket) => {
//   // Add the new user to the list
//   users.push(socket);

//   // Listen for messages from the user
//   socket.on('message', (message) => {
//     // Broadcast the message to all connected users
//     io.emit('message', message);
//   });

//   // Listen for the user disconnecting
//   socket.on('disconnect', () => {
//     // Remove the user from the list
//     users.splice(users.indexOf(socket), 1);
//   });
// });

// // Start the server
// // server.listen(3001, () => {
// //   console.log('Server listening on port 3001');
// // });

// }

// // import socketIO from 'socket.io';
// // import { Message } from '../db/entities/messege.entity.js';
// // import { User } from '../db/entities//user.entity.js';
// // import express from 'express';
// // import {messageController} from '../controllers/message.controller.js'; // Import your message controller

// //  const socketHandler = (io) => {
// // //   const io = socketIO(server);

// //   io.on('connection', (socket) => { 
// //     console.log('A user connected');

// //     const token = socket.handshake.headers.authorization?.split(' ')[1];

// //     socket.on('join', (username) => {
// //       socket.join('global');
// //       // ...

// //       socket.on('message', async (data, callback) => {
// //         const senderId = getusernameBySocketId(socket.id);
// //         if (!senderId) {
// //           // Handle the case where the sender is not found (e.g., session expired)
// //           return;
// //         }

// //     //     const user = await User.findOne({ where: { username } });
// //     //   if (!user) {
// //     //     return res.status(404).json({ message: 'User not found' });
// //     //   }

// //         // Call the sendMessage method from your message controller
// //         const req = { body: { senderId, receiverId: data.receiver, text: data.text } } as express.Request;
// //         const res = {
// //           status: (code) => {
// //             // Handle the response status (e.g., 201 for success, 500 for an error)
// //             if (code === 201) {
// //               // Notify the sender that the message was sent successfully
// //               callback({ status: 'sent' });
// //             } else {
// //               // Handle errors
// //             }
// //           },
// //         };
// //         messageController.sendMessage(req, res);
// //       });

// //       socket.on('disconnect', () => {
// //         // Handle user disconnect
// //         // ...
// //       });
// //     });
// //   });

// //   // Helper function to get the user ID associated with a socket ID
// //   function getusernameBySocketId(socketId) {
// //     for (const username in connectedUsers) {
// //       if (connectedUsers[username].socketId === socketId) {
// //         return username;
// //       }
// //     }
// //     return null;
// //   }
// // };

// export default socketHandler;