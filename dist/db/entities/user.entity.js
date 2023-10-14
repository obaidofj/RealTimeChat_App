var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, OneToOne, JoinColumn, JoinTable, BeforeInsert } from 'typeorm';
import { MuteBlockUser } from './muteBlockUser.entity.js';
import { Message } from './messege.entity.js';
import { ConnectionFriendship } from './connectionFriendship.entity.js';
import { Profile } from './profile.entity.js';
import { Role } from './role.entity.js';
import bcrypt from 'bcrypt';
// import { Message } from './messege.entity.js'; 
let User = class User extends BaseEntity {
    id;
    username;
    email;
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
    password;
    chatGroups;
    notifications;
    paymentTransactions;
    initiatedConnectionFriendship;
    receivedConnectionFriendship;
    initiatedMuteBlocks;
    receivedMuteBlocks;
    sentMessages;
    receivedMessages;
    roles;
    profile;
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
    BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    OneToMany(() => ConnectionFriendship, (ConnectionFriendship) => ConnectionFriendship.initiator),
    __metadata("design:type", Array)
], User.prototype, "initiatedConnectionFriendship", void 0);
__decorate([
    OneToMany(() => ConnectionFriendship, (ConnectionFriendship) => ConnectionFriendship.recipient),
    __metadata("design:type", Array)
], User.prototype, "receivedConnectionFriendship", void 0);
__decorate([
    OneToMany(() => MuteBlockUser, (muteBlock) => muteBlock.affecteduser),
    __metadata("design:type", Array)
], User.prototype, "initiatedMuteBlocks", void 0);
__decorate([
    OneToMany(() => MuteBlockUser, (muteBlock) => muteBlock.affecteduser),
    __metadata("design:type", Array)
], User.prototype, "receivedMuteBlocks", void 0);
__decorate([
    OneToMany(() => Message, (messege) => messege.sender),
    __metadata("design:type", Array)
], User.prototype, "sentMessages", void 0);
__decorate([
    OneToMany(() => Message, (messege) => messege.receiver),
    __metadata("design:type", Array)
], User.prototype, "receivedMessages", void 0);
__decorate([
    ManyToMany(() => Role, role => role.users, { eager: true }),
    JoinTable(),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    OneToOne(() => Profile, profile => profile.user, { cascade: true, eager: true }),
    JoinColumn(),
    __metadata("design:type", Profile
    // async getSentMessages(): Promise<Message[]> {
    //   const sentMessages = await Message.find({ sender: this });
    //   return sentMessages;
    // }
    // async getReceivedMessages(): Promise<Message[]> {
    //   const receivedMessages = await Message.find({ receiver: this });
    //   return receivedMessages;
    // }
    // async getInitiatedMuteBlocks(): Promise<MuteBlockUser[]> {
    //   const initiatedMuteBlocks = await MuteBlockUser.find({ initiatoruser: this });
    //   return initiatedMuteBlocks;
    // }
    // async getReceivedMuteBlocks(): Promise<MuteBlockUser[]> {
    //   const receivedMuteBlocks = await MuteBlockUser.find({ affecteduser: this });
    //   return receivedMuteBlocks;
    // }
    // async getInitiatedConnectionFriendship (): Promise<ConnectionFriendship[]> {
    //   const initiatedConnectionFriendship = await ConnectionFriendship.find({ initiator: this });
    //   return initiatedConnectionFriendship;
    // }
    // async getReceivedConnectionFriendship(): Promise<ConnectionFriendship[]> {
    //   const receivedConnectionFriendship = await ConnectionFriendship.find({ recipient: this });
    //   return receivedConnectionFriendship;
    // }
    )
], User.prototype, "profile", void 0);
User = __decorate([
    Entity()
], User);
export { User };
//# sourceMappingURL=user.entity.js.map