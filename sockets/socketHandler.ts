
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
  console.log("here");

  // Create a list to store connected users
  const users = [];

  // Listen for new connections
  io.on('connection', async (socket) => {
    // Add the new user to the list

   
    const socketId = socket.id;

    // console.log(socketId ,'-', token);

    // users[socketId] = user?.username;

    console.log(users);

    // users.push({ toString(socketId) : user?.username});

    //const token = socket.handshake.headers.authorization?.split(' ')[1];


    // Listen for messages from the user
    socket.on('message',  (data, callback) => {
      
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

  return server;

};


function getusernameBySocketId(socketId, users) {
  for (const user of users) {
    if (user.socketId === socketId) {
      return user.name;
    }
  }
  return null;
}

export default socketHandler;

