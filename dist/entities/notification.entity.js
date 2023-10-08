var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { User } from './user.entity.js';
import { ManyToMany } from 'typeorm/browser';
import { JoinTable } from 'typeorm/browser';
let Notification = class Notification extends BaseEntity {
    id;
    message;
    isRead;
    createdAt;
    notificationRecipient;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Notification.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isRead", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Notification.prototype, "createdAt", void 0);
__decorate([
    ManyToMany(() => User, { eager: true }),
    JoinTable(),
    __metadata("design:type", Array)
], Notification.prototype, "notificationRecipient", void 0);
Notification = __decorate([
    Entity()
], Notification);
export { Notification };
//# sourceMappingURL=notification.entity.js.map