import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import expsession from 'express-session';
import path from 'path';

const app = express();
const server = createServer(app);
const io = new Server(server);

// Initialize session middleware
const sessionMiddleware = expsession({
  secret: 'random secret',
  saveUninitialized: true,
  resave: true
});

// Hook up session for express routes
app.use(sessionMiddleware);

// Hook up the session for socket.io connections
io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});

// When a socket.io connection connects, get the session and store the id in it
io.on('connection', (socket) => {
  console.log(`socket.io connected: ${socket.id}`);
  console.log("session at socket.io connection:\n", socket.request.session);
  socket.request.session.socketio = socket.id;
  socket.request.session.save();
});

// General middleware to demo an increasing, per-client value in the session
app.use((req, res, next) => {
  const session = req.session;
  if (!session.cntr) session.cntr = 0;
  ++session.cntr;
  next();
});

// Route handler to serve up the default page
app.get("/", (req, res) => {
  const session = req.session;
  console.log("\n\npage load\n---------------------------\n");
  console.log("session:\n", session);
  res.sendFile(path.join(__dirname, "socket-io-session.html"));
});

let cntr = 1;

// Test route to show using socket.io .emit() from an express route
app.get("/api/test", (req, res) => {
  const session = req.session;
  io.sockets.connected[session.socketio].emit('show', cntr++);
  res.json({greeting: "hello"});
});

server.listen(5000);
 