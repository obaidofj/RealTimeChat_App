// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import socketHandler from "../sockets/socketHandler.js";

const socketHandlerMiddleware = (req, res, next) => {
  // Geting the Express app variable from the request object
  const app = req.app;

  // Passing the Express app variable to the socketHandler() function
  const socketIO = socketHandler(app);
  socketIO.emit('message', 'first mesg!');
  // Attaching the Socket.io server to the request object
  req.socketIO = socketIO;

  // Calling the next middleware function
  next();
};

export default socketHandlerMiddleware;