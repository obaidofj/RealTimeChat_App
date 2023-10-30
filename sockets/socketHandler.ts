

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
  const users = [];

  // Listen for new connections
  io.on('connection', async (socket) => {
    // Add the new user to the list

    const socketId = socket.id;

    // console.log(socketId ,'-', token);

    // Access session data
    const sessionData = socket.request.session;

    
    users[socketId] = { "username":sessionData.username, "userid":sessionData.userId };

    console.log(users);



    // Listen for messages from the user
    socket.on('message',  (data, callback) => {
      
  

      // Broadcast the message to all connected users
      io.emit('message', data); // do this need to be with db saving ?
    });

    // Listen for the user disconnecting
    socket.on('disconnect', () => {
      // Remove the user from the list
      users.splice(users.indexOf(socket), 1);
    });
  });

  return io;

};

// Helper function to parse cookies from the header string
// function parseCookies(cookieString) {
//   const cookies = {};
//   cookieString.split(';').forEach((cookie) => {
//     const parts = cookie.split('=');
//     cookies[parts[0].trim()] = parts[1];
//   });
//   return cookies;
// }


function getusernameBySocketId(socketId, users) {
  for (const user of users) {
    if (user.socketId === socketId) {
      return user.name;
    }
  }
  return null;
}

export default socketHandler;

