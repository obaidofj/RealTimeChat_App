var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity.js';
let Message = class Message extends BaseEntity {
    id;
    text;
    createdAt;
    sender;
    senderid;
    receiver;
    receiverid;
    attachments;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Message.prototype, "text", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.sentMessages),
    JoinColumn({ name: 'senderid' }),
    __metadata("design:type", Object)
], Message.prototype, "sender", void 0);
__decorate([
    Column({ name: 'senderid' }),
    __metadata("design:type", Number)
], Message.prototype, "senderid", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.receivedMessages),
    JoinColumn({ name: 'receiverid' }),
    __metadata("design:type", Object)
], Message.prototype, "receiver", void 0);
__decorate([
    Column({ name: 'receiverid' }),
    __metadata("design:type", Number)
], Message.prototype, "receiverid", void 0);
Message = __decorate([
    Entity()
], Message);
export { Message };
//# sourceMappingURL=messege.entity.js.map