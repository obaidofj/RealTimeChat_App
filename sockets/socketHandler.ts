// Import necessary modules and models
import socketIO from 'socket.io';
// const { Message } = require('../models/Message');

// Initialize a socket.io server
module.exports = (server) => {
  const io = socketIO(server);

  // Define a connection event when a client connects
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle incoming messages
    socket.on('message', async (data) => {
      try {
        // Save the message to the database (you may need to modify this based on your models)
        const message = new Message({
          text: data.text,
          sender: data.sender,
          receiver: data.receiver,
        });
        await message.save();

        // Broadcast the message to the sender and receiver
        socket.emit('message', message); // Send to the sender
        socket.to(data.receiver).emit('message', message); // Send to the receiver
      } catch (error) {
        console.error(error);
      }
    });

    // Handle disconnect event when a client disconnects
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};
