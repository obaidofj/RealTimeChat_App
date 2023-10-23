var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Message } from './messege.entity.js';
// import { Message } from './messege.entity.js'; 
let User = class User extends BaseEntity {
    id;
    username;
    email;
    password;
    chatGroups;
    notifications;
    paymentTransactions;
    //  @OneToMany(() => ConnectionFriendship, (ConnectionFriendship) => ConnectionFriendship.initiator)
    //   friendshipsInitiated : ConnectionFriendship[];
    //   @OneToMany(() => ConnectionFriendship, (ConnectionFriendship) => ConnectionFriendship.recipient)
    //   friendshipsReceived: ConnectionFriendship[];
    // @OneToMany(() => MuteBlockUser, (muteBlock) => muteBlock.sourceUser)
    // initiatedMuteBlocks: MuteBlockUser[];
    // @OneToMany(() => MuteBlockUser, (muteBlock) => muteBlock.affectedUser)
    // receivedMuteBlocks: MuteBlockUser[];
    // sentMessages: Message[];
    // receivedMessages: Message[];
    async getSentMessages() {
        // @ts-ignore
        const sentMessages = await Message.find({ sender: this });
        return sentMessages;
    }
    async getReceivedMessages() {
        // @ts-ignore
        const receivedMessages = await Message.find({ receiver: this });
        return receivedMessages;
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    Entity()
], User);
export { User };
//# sourceMappingURL=user.entity.js.map