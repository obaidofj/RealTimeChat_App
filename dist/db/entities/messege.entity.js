var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity.js';
let Message = class Message extends BaseEntity {
    id;
    content;
    createdAt;
    sender;
    receiver;
    attachments;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.sentMessages, { eager: true }),
    __metadata("design:type", User)
], Message.prototype, "sender", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.receivedMessages, { eager: true }),
    __metadata("design:type", User)
], Message.prototype, "receiver", void 0);
Message = __decorate([
    Entity()
], Message);
export { Message };
//# sourceMappingURL=messege.entity.js.map