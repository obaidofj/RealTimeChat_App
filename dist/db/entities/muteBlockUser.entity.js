var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { User } from './user.entity.js';
let MuteBlockUser = class MuteBlockUser extends BaseEntity {
    id;
    isMute;
    isBlock;
    initiatoruser;
    initiatoruser;
    affecteduser;
    senderid;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MuteBlockUser.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Boolean)
], MuteBlockUser.prototype, "isMute", void 0);
__decorate([
    Column(),
    __metadata("design:type", Boolean)
], MuteBlockUser.prototype, "isBlock", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.initiatedMuteBlocks),
    JoinColumn({ name: 'initiatoruserid' }),
    __metadata("design:type", Object)
], MuteBlockUser.prototype, "initiatoruser", void 0);
__decorate([
    Column({ name: 'initiatoruserid' }),
    __metadata("design:type", Number)
], MuteBlockUser.prototype, "initiatoruser", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.receivedMuteBlocks),
    JoinColumn({ name: 'receiveduserid' }),
    __metadata("design:type", Object)
], MuteBlockUser.prototype, "affecteduser", void 0);
__decorate([
    Column({ name: 'receiveduserid' }),
    __metadata("design:type", Number)
], MuteBlockUser.prototype, "senderid", void 0);
MuteBlockUser = __decorate([
    Entity()
], MuteBlockUser);
export { MuteBlockUser };
//# sourceMappingURL=muteBlockUser.entity.js.map