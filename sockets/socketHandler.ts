

import jwt from 'jsonwebtoken';

import { Server as SocketIOServer } from 'socket.io';

import http from 'http';
import { User } from '../db/entities/user.entity.js';
import { threadId } from 'worker_threads';
import { MessegeStatus } from '../types/messege.types.js';
import express from 'express';
import { messageController } from '../controllers/message.controller.js';
import socketIo from 'socket.io';
// import { AppTypes } from "../types/app.types.js";


type SessionData = {
  username: string;
  userId: number;
  // Add other properties as needed
};
 export const connectedUsers = [];
const socketHandler = (server) => {//app: http.RequestListener<typeof http.IncomingMessage, typeof http.ServerResponse> | undefined
 

  let username = '';
  let userId = null;

  // Initialize Socket.io
  const io = new SocketIOServer(server, { transports: ['websocket'] });
  // console.log("here");

  // io.use((socket, next) => {
  //   sessionMiddleware(socket.request, socket.request.res, next);
  // });

  //  io.use((socket, next) => {
  //   // Here, we manually parse cookies from the handshake request
  //   const cookie = socket.handshake.headers.cookie;
  //   const sessionID = cookie.split('=')[1]; // Extract the session ID

  //   // You may want to consider additional error handling here
  //   if (!sessionID) {
  //     return next(new Error('No session cookie found'));
  //   }

  //   // Retrieve the session store and get the session
  //   const sessionStore = socket.request.sessionStore;
  //   sessionStore.get(sessionID, (err, session) => {
  //     if (err || !session) {
  //       return next(new Error('Error retrieving session'));
  //     }

  //     // Attach the session data to the socket
  //     socket.request.session = session;

  //     next();
  //   });
  //  });
  
  // Create a list to store connected users
 

  // Listen for new connections
  io.on('connection', async (socket) => {
    // Add the new user to the list

    const socketId = socket.id;

    // console.log(socketId ,'-', token);

    // Access session data
    const sessionData = socket.request.session;

    
    connectedUsers[socketId] = { "username":sessionData.username, "userid":sessionData.userId };

    console.log(connectedUsers);



    // Listen for messages from the user
    socket.on('message',  (data, callback) => {
      const socketId =findSocketIdByUsername(data.user.username);
      // io.to(receiverSocketId).emit('message', {
      // Broadcast the message to all connected users
      io.emit('message', data); // do this need to be with db saving ?
    });

    // Listen for the user disconnecting
    socket.on('disconnect', () => {
       // Remove the user from the users array
  deleteUserBySocketId(socket.id);

  // Emit a "userDisconnected" event to notify other clients about the disconnected user
  socket.broadcast.emit('userDisconnected', findUsernameBySocketId(socket.id));
    });
  });

  return io;

};



function deleteUserBySocketId(socketId) {
  delete connectedUsers[socketId];
}

function findSocketIdByUsername(username) {
  for (const socketId in connectedUsers) {
    if (connectedUsers[socketId].username === username) {
      return socketId;
    }
  }
  return null; 
}
export function findUsernameBySocketId(socketId) {
  for (const key in connectedUsers) {
    if (connectedUsers.hasOwnProperty(key)) {
      if (connectedUsers[key].socketId === socketId) {
        return connectedUsers[key].username;
      }
    }
  }
  return null; // Return null if socket ID is not found
}

export default socketHandler;

