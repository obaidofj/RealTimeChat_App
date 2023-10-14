var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity.js';
let ConnectionFriendship = class ConnectionFriendship extends BaseEntity {
    id;
    isAccepted;
    initiator;
    senderid;
    recipient;
    senderid;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ConnectionFriendship.prototype, "id", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], ConnectionFriendship.prototype, "isAccepted", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.getInitiatedConnectionFriendship),
    JoinColumn({ name: 'initiatoUserId' }),
    __metadata("design:type", Object)
], ConnectionFriendship.prototype, "initiator", void 0);
__decorate([
    Column({ name: 'senderid' }),
    __metadata("design:type", Number)
], ConnectionFriendship.prototype, "senderid", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.getReceivedConnectionFriendship),
    JoinColumn({ name: 'recipientUserId' }),
    __metadata("design:type", Object)
], ConnectionFriendship.prototype, "recipient", void 0);
__decorate([
    Column({ name: 'recipient' }),
    __metadata("design:type", Number)
], ConnectionFriendship.prototype, "senderid", void 0);
ConnectionFriendship = __decorate([
    Entity()
], ConnectionFriendship);
export { ConnectionFriendship };
//# sourceMappingURL=connectionFriendship.entity.js.map