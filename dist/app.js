import './config.js';
import express from 'express';
import { initDB } from './db/connection.js';
import cookieParser from 'cookie-parser';
import winsLogger from './middleware/logging.js';
import indexRouter from './routes/index.router.js';
var app = express();
app.use(cookieParser());
app.use(express.json());
app.use('/', indexRouter);
app.listen(process.env.APP_PORT, () => {
    winsLogger.log({ level: 'info',
        message: `App is listening on port ${process.env.APP_PORT}`,
        timestamp: new Date() });
    ;
    initDB();
});
export default app;
//# sourceMappingURL=app.js.map