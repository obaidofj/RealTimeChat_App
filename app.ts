import './config.js';
import applyMigration from './db/runMigration.js'
import express from 'express';
import dataSource from './db/connection.js';
import cookieParser from 'cookie-parser';
import winsLogger from './middlewares/logging.js'
import indexRouter from './routes/index.routes.js'
import userRouter from './routes/auth.routes.js'
import chatGroupRouter from './routes/chatGroup.routes.js'
import messegeRouter from './routes/message.routes.js'
import muteBlockRouter from './routes/muteBlockUser.js'
import notificationRouter from './routes/notification.routes.js'
import orderRouter from './routes/order.routes.js'
import paymentRouter from './routes/payment.routes.js'
import productRouter from './routes/product.routes.js'
import connectionRouter from './routes/connectionFriendship.routes.js'
import { QueryRunner } from 'typeorm';
import {seedDatabase} from './db/seeds/seedDB.js'
import { fileURLToPath } from 'url';
import path from 'path';
import upload from './middlewares/multerconfig.js';
import { authenticate } from './middlewares/authentication.js';
import cors from 'cors';
import http from 'http'; // Import the HTTP module
// import socketIo from 'socket.io'; // Import Socket.io
// import socketIO from 'socket.io';
import socketIO , {Server} from 'socket.io';
import socketHandler from './sockets/socketHandler.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

var app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(cookieParser()); 
app.use(express.json());  

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set up HTTP server for Socket.io
const server = http.createServer(app);
// const io = socketIO(server);
const io = new Server(server);
// io.attachApp(app);
socketHandler(io);
 
app.use('/', indexRouter);

app.use('/auth', userRouter);
app.use(authenticate);
app.use('/chat', chatGroupRouter);
app.use('/messege',  messegeRouter);
app.use('/blockmute', muteBlockRouter);
app.use('/notify', notificationRouter); 
app.use('/order', orderRouter);
app.use('/payment', paymentRouter);
app.use('/product', productRouter);
app.use('/connection', connectionRouter);

 
app.listen(process.env.APP_PORT, () => {
    winsLogger.info( `App is listening on port ${process.env.APP_PORT}`
    );

});

 
dataSource 
    .initialize() 
    .then( async () => {
      winsLogger.info(  'Data Source has been initialized!'  ); 
      try {
        const queryRunner = dataSource.createQueryRunner()
          await applyMigration(queryRunner);
          console.log("Migration has been applied successfully.");
          // You can continue with other operations here.
        } catch (error) {
          if(error.message=='Migration for Data seeding is already aplied.')
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
      winsLogger.error({level: 'info',
      message: 'Error during Data Source initialization: ' + err,
      timestamp: new Date(),});
    });

  
  
    
export default app;