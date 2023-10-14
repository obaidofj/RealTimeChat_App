import './config.js';
import applyMigration from './db/runMigration.js';
import express from 'express';
import dataSource from './db/connection.js';
import cookieParser from 'cookie-parser';
import winsLogger from './middlewares/logging.js';
import indexRouter from './routes/index.routes.js';
import userRouter from './routes/auth.routes.js';
import chatGroupRouter from './routes/chatGroup.routes.js';
import messegeRouter from './routes/message.routes.js';
import muteBlockRouter from './routes/muteBlockUser.js';
import notificationRouter from './routes/notification.routes.js';
import orderRouter from './routes/order.routes.js';
import paymentRouter from './routes/payment.routes.js';
import productRouter from './routes/product.routes.js';
import connectionRouter from './routes/connectionFriendship.routes.js';
import { fileURLToPath } from 'url';
import path from 'path';
import upload from './middlewares/multerConfig.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/', indexRouter);
app.use('/auth', userRouter);
app.use('/chat', chatGroupRouter);
app.use('/messege', upload.single('file'), messegeRouter);
app.use('/blockmute', muteBlockRouter);
app.use('/notify', notificationRouter);
app.use('/order', orderRouter);
app.use('/payment', paymentRouter);
app.use('/product', productRouter);
app.use('/connection', connectionRouter);
app.listen(process.env.APP_PORT, () => {
    winsLogger.log({ level: 'info',
        message: `App is listening on port ${process.env.APP_PORT}`,
        timestamp: new Date(), });
    dataSource
        .initialize()
        .then(async () => {
        winsLogger.log({ level: 'info',
            message: 'Data Source has been initialized!',
            timestamp: new Date(), });
        const queryRunner = dataSource.createQueryRunner();
        try {
            await applyMigration(queryRunner);
            console.log("Migration has been applied successfully.");
            // You can continue with other operations here.
        }
        catch (error) {
            if (error.message == 'Migration for Data seeding is already aplied.')
                console.error(error.message);
            else
                console.error(error);
            // Handle errors or perform cleanup here if needed.
        }
        finally {
            // await queryRunner.release();
            // Release the queryRunner when done.
        }
    })
        .catch((err) => {
        winsLogger.error({ level: 'info',
            message: 'Error during Data Source initialization: ' + err,
            timestamp: new Date(), });
    });
});
export default app;
//# sourceMappingURL=app.js.map