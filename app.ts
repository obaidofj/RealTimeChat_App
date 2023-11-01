// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import './configEnv.js';
import applyMigration from './db/runMigration.js'
import express from 'express';
import dataSource from './db/connection.js';
import cookieParser from 'cookie-parser';
import winsLogger from './middlewares/logging.js'
import indexRouter from './routes/index.routes.js'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import chatGroupRouter from './routes/chatGroup.routes.js'
import messegeRouter from './routes/message.routes.js'
import muteBlockRouter from './routes/muteBlockUser.js'
import notificationRouter from './routes/notification.routes.js'
import orderRouter from './routes/order.routes.js'
import paymentRouter from './routes/payment.routes.js'
import productRouter from './routes/product.routes.js'
import connectionRouter from './routes/connectionFriendship.routes.js'
import fileRouter from './routes/file.routes.js'
import { QueryRunner } from 'typeorm';
import { seedDatabase } from './db/seeds/seedDB.js'
import { fileURLToPath } from 'url';
import path from 'path';
import upload from './middlewares/multerconfig.js';
import { authenticate } from './middlewares/authentication.js';
import cors from 'cors';
import http from 'http';
import AWS from 'aws-sdk';
import socketIOSession from 'express-socket.io-session';
// import socketHandlerMiddleware from './middlewares/socket.js';
import socketHandler from './sockets/socketHandler.js';
import { Server } from 'http';
import fs from 'fs';
import { Server as SocketIOServer } from 'socket.io';
import session, { SessionData } from 'express-session';



const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

var app = express();
 
 

app.use(cors({
  origin: 'http://127.0.0.1:4000',
  credentials: true
}));

// app.use((req, res, next) => {
//   // Set the 'app' property on the 'req' object
//   req.app = app;
//   next();
// });

// app.use(socketHandlerMiddleware);
app.use(cookieParser());
app.use(express.json());

// // Create a Redis client
// const client = redis.createClient({
//   host: 'localhost', // Change to your Redis server's host
//   port: 6379,        // Change to your Redis server's port
// });

// Set up session middleware with Redis as the store

  

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 60 * 60 * 1000 * 12,
  },
}); //as express.RequestHandler;
  
app.use(sessionMiddleware);

// route to   retrieve session data
app.get('/getSessionData', (req, res) => {
  // Retrieve session data from the server's session store
  const sessionData = req.session;
 
  // Send the session data as JSON in the response
  res.json(sessionData);
});

// app.get('/fromsocket', (req, res) => {
//   // Send a message to all connected users
//   const socketIO = req.socketIO;
//   socketIO.emit('message', 'Hello from the Express - Socket server!');

//   res.send('Hello from the Express server!');
// });


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use('/', indexRouter);

app.use('/file', fileRouter);


app.use('/auth', authRouter);
app.use(authenticate);
app.use('/user', userRouter);
app.use('/chat', chatGroupRouter);
app.use('/messege', messegeRouter);
app.use('/blockmute', muteBlockRouter);
app.use('/notify', notificationRouter);
app.use('/order', orderRouter);
app.use('/payment', paymentRouter);
app.use('/product', productRouter);
app.use('/connection', connectionRouter);

const server = http.createServer(app); // Create an HTTP server
// const server = new Server(app);

// Use express-socket.io-session middleware to share sessions
const io = socketHandler(server);
// io.use(socketIOSession(app.locals.session, { autoSave: true }));


io.use((socket, next) => {
  sessionMiddleware(socket.request, {} as any, next);
});

dataSource
  .initialize()
  .then(async () => {
    winsLogger.info('Data Source has been initialized!');
    try {

      const queryRunner = dataSource.createQueryRunner()

      // await applyMigration(queryRunner);
      // console.log("Migration has been applied successfully.");
      // cost user={req.session.username,}
      // const server = socketHandler(app);
      server.listen(process.env.APP_PORT, () => {
        winsLogger.info(`App is listening on port ${process.env.APP_PORT}`
        );
      });

      // You can continue with other operations here.
    } catch (error) {
      if (error.message == 'Migration for Data seeding is already aplied.')
        console.error(error.message);
      else
        console.error(error);
      // Handle errors or perform cleanup here if needed.
    } finally {
      // await queryRunner.release();
      // Release the queryRunner when done.
    }

  })
  .catch((err) => {
    winsLogger.error({
      level: 'info',
      message: 'Error during Data Source initialization: ' + err,
      timestamp: new Date(),
    });
  });




export default app;