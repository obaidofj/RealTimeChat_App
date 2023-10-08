var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity.js';
let ChatGroup = class ChatGroup extends BaseEntity {
    id;
    name;
    users;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ChatGroup.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ChatGroup.prototype, "name", void 0);
__decorate([
    ManyToMany(() => User, { eager: true }),
    JoinTable(),
    __metadata("design:type", Array)
], ChatGroup.prototype, "users", void 0);
ChatGroup = __decorate([
    Entity()
], ChatGroup);
export { ChatGroup };
//# sourceMappingURL=chatGroup.entity.js.map