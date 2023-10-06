import { DataSource } from "typeorm";
declare const connection: DataSource;
export declare const initDB: () => Promise<void>;
export default connection;
