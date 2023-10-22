import socketIO from 'socket.io';
import { Message } from '../db/entities/messege.entity.js';
import { User } from '../db/entities//user.entity.js';
import {messageController} from '../controllers/message.controller.js'; // Import your message controller

 const socketHandler = (io) => {
//   const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    const token = socket.handshake.headers.authorization?.split(' ')[1];

    socket.on('join', (username) => {
      socket.join('global');
      // ...

      socket.on('message', async (data, callback) => {
        const senderId = getusernameBySocketId(socket.id);
        if (!senderId) {
          // Handle the case where the sender is not found (e.g., session expired)
          return;
        }

    //     const user = await User.findOne({ where: { username } });
    //   if (!user) {
    //     return res.status(404).json({ message: 'User not found' });
    //   }

        // Call the sendMessage method from your message controller
        const req = { body: { senderId, receiverId: data.receiver, text: data.text } };
        const res = {
          status: (code) => {
            // Handle the response status (e.g., 201 for success, 500 for an error)
            if (code === 201) {
              // Notify the sender that the message was sent successfully
              callback({ status: 'sent' });
            } else {
              // Handle errors
            }
          },
        };
        messageController.sendMessage(req, res);
      });

      socket.on('disconnect', () => {
        // Handle user disconnect
        // ...
      });
    });
  });

  // Helper function to get the user ID associated with a socket ID
  function getusernameBySocketId(socketId) {
    for (const username in connectedUsers) {
      if (connectedUsers[username].socketId === socketId) {
        return username;
      }
    }
    return null;
  }
};

export default socketHandler;