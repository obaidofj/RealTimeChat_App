import winston from 'winston';
const winsLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { project: 'RealTimeChatApp', time: Date.now() },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/all.log' }),
        new winston.transports.Console(),
    ],
});
export default winsLogger;
//# sourceMappingURL=logging.js.map