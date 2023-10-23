import { DataSource } from "typeorm";
import { Message } from './entities/messege.entity.js';
import { Attachment } from './entities/attachment.entity.js';
import { ChatGroup } from './entities/chatGroup.entity.js';
import { ConnectionFriendship } from './entities/connectionFriendship.entity.js';
import { MuteBlockUser } from './entities/muteBlockUser.entity.js';
import { Notification } from './entities/notification.entity.js';
import { Order } from './entities/order.entity.js';
import { PaymentTransaction } from './entities/paymentTransaction.entity.js';
import { Product } from './entities/product.entity.js';
import { User } from './entities/user.entity.js';
import { Role } from './entities/role.entity.js';
import { Permissions } from './entities/permissions.entity.js';
import { Profile } from './entities/profile.entity.js';
import { Flags } from './entities/flags.entiy.js';
const connection = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Message, Attachment, ChatGroup, ConnectionFriendship, MuteBlockUser, Notification, Order, Product, PaymentTransaction, Permissions, Profile, Role, Flags],
    migrations: [],
    logging: true,
    synchronize: true,
});
export default connection;
//# sourceMappingURL=connection.js.map