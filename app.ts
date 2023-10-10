import './config.js';
import applyMigration from './db/runMigration.js'
import express from 'express';
import dataSource from './db/connection.js';
import cookieParser from 'cookie-parser';
import winsLogger from './middlewares/logging.js'
import indexRouter from './routes/index.routes.js'
import userRouter from './routes/user.routes.js'
import chatGroupRouter from './routes/chatGroup.routes.js'
import messegeRouter from './routes/message.routes.js'
import muteBlockRouter from './routes/muteBlockUser.js'
import notificationRouter from './routes/notification.routes.js'
import orderRouter from './routes/order.routes.js'
import paymentRouter from './routes/payment.routes.js'
import productRouter from './routes/product.routes.js'
import connectionRouter from './routes/connectionFriendship.routes.js'


var app = express();

app.use(cookieParser()); 
app.use(express.json());  

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/chat', chatGroupRouter);
app.use('/messege', messegeRouter);
app.use('/blockmute', muteBlockRouter);
app.use('/notify', notificationRouter);
app.use('/order', orderRouter);
app.use('/payment', paymentRouter);
app.use('/product', productRouter);
app.use('/connection', connectionRouter);


app.listen(process.env.APP_PORT, () => {
    winsLogger.log( {level: 'info',
    message: `App is listening on port ${process.env.APP_PORT}`,
    timestamp: new Date(),});
    
dataSource 
    .initialize() 
    .then(() => {
      winsLogger.log(  {level: 'info',
      message: 'Data Source has been initialized!',
      timestamp: new Date(),});
    })
    .catch((err) => {
      winsLogger.error({level: 'info',
      message: 'Error during Data Source initialization: ' + err,
      timestamp: new Date(),});
    }) 
    
  });

  applyMigration().then(() => {
    console.log('Migration applied successfully.');
  });
    
export default app;