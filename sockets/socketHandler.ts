// Create a new Express app
import express from 'express';
const app = express();

// Create a new Socket.io server
// const http = require('http');
// const server = http.createServer(app);
// const io = require('socket.io')(server);
const socketHandler = (io) => {
// Create a list to store connected users
const users = [];

// Listen for new connections
io.on('connection', (socket) => {
  // Add the new user to the list
  users.push(socket);

  // Listen for messages from the user
  socket.on('message', (message) => {
    // Broadcast the message to all connected users
    io.emit('message', message);
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

}

// import socketIO from 'socket.io';
// import { Message } from '../db/entities/messege.entity.js';
// import { User } from '../db/entities//user.entity.js';
// import express from 'express';
// import {messageController} from '../controllers/message.controller.js'; // Import your message controller

//  const socketHandler = (io) => {
// //   const io = socketIO(server);

//   io.on('connection', (socket) => { 
//     console.log('A user connected');

//     const token = socket.handshake.headers.authorization?.split(' ')[1];

//     socket.on('join', (username) => {
//       socket.join('global');
//       // ...

//       socket.on('message', async (data, callback) => {
//         const senderId = getusernameBySocketId(socket.id);
//         if (!senderId) {
//           // Handle the case where the sender is not found (e.g., session expired)
//           return;
//         }

//     //     const user = await User.findOne({ where: { username } });
//     //   if (!user) {
//     //     return res.status(404).json({ message: 'User not found' });
//     //   }

//         // Call the sendMessage method from your message controller
//         const req = { body: { senderId, receiverId: data.receiver, text: data.text } } as express.Request;
//         const res = {
//           status: (code) => {
//             // Handle the response status (e.g., 201 for success, 500 for an error)
//             if (code === 201) {
//               // Notify the sender that the message was sent successfully
//               callback({ status: 'sent' });
//             } else {
//               // Handle errors
//             }
//           },
//         };
//         messageController.sendMessage(req, res);
//       });

//       socket.on('disconnect', () => {
//         // Handle user disconnect
//         // ...
//       });
//     });
//   });

//   // Helper function to get the user ID associated with a socket ID
//   function getusernameBySocketId(socketId) {
//     for (const username in connectedUsers) {
//       if (connectedUsers[username].socketId === socketId) {
//         return username;
//       }
//     }
//     return null;
//   }
// };

export default socketHandler;