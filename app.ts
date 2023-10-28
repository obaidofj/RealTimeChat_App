import './config.js';
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
import AWS from 'aws-sdk'

// Import the HTTP module
// import socketIo from 'socket.io'; // Import Socket.io
// import socketIO from 'socket.io';
// import socketIO , {Server} from 'socket.io';
// import socketHandler from './sockets/socketHandler.js';
import socketHandlerMiddleware from './middlewares/socket.js';
import socketHandler from './sockets/socketHandler.js';
import fs from 'fs';

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

// // Set up session middleware with Redis as the store
// app.use(
//   session({
//     store: new RedisStore({ client }),
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: false, // Change to true if using HTTPS
//     },
//   })
// );

// app.get('/fromsocket', (req, res) => {
//   // Send a message to all connected users
//   const socketIO = req.socketIO;
//   socketIO.emit('message', 'Hello from the Express - Socket server!');

//   res.send('Hello from the Express server!');
// });


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Set up HTTP server for Socket.io
// const server = http.createServer(app);
// // const io = socketIO(server);
// const io = new Server(server , {transports: ['websocket'],});
// // io.attachApp(app);
// socketHandler(io);

// const server = http.createServer(app);
// const io = require('socket.io')(server);

// const server = http.createServer(app);
// const io = new Server(server, { transports: ['websocket'] });



// const http = require('http');

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



// const server = http.createServer(app);


// const io = new Server(server, { transports: ['websocket'] });

dataSource
  .initialize()
  .then(async () => {
    winsLogger.info('Data Source has been initialized!');
    try {
      
      const queryRunner = dataSource.createQueryRunner()

      // await applyMigration(queryRunner);
      // console.log("Migration has been applied successfully.");

      const server = socketHandler(app);
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