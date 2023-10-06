import { DataSource } from "typeorm";
import winsLogger from "../middleware/logging.js";
const connection = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['/entities/*.js'],
    migrations: ['./**/migration/*.ts'],
    synchronize: true,
    logging: true,
});
export const initDB = async () => await connection.initialize().then(() => {
    winsLogger.log({ level: 'info',
        message: 'Connected to DB!',
        timestamp: new Date(), });
}).catch(err => {
    winsLogger.error({ level: 'info',
        message: 'Failed to connect to DB: ' + err,
        timestamp: new Date(), });
});
export default connection;
//# sourceMappingURL=connection.js.map