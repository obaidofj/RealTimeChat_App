var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Message } from './messege.entity.js';
let Attachment = class Attachment extends BaseEntity {
    id;
    filename;
    mimeType;
    size;
    message;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Attachment.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Attachment.prototype, "filename", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Attachment.prototype, "mimeType", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Attachment.prototype, "size", void 0);
__decorate([
    ManyToOne(() => Message, (message) => message.attachments),
    __metadata("design:type", Message)
], Attachment.prototype, "message", void 0);
Attachment = __decorate([
    Entity()
], Attachment);
export { Attachment };
//# sourceMappingURL=attachment.entity.js.map