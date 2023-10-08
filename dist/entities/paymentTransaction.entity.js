var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity.js';
let PaymentTransaction = class PaymentTransaction extends BaseEntity {
    id;
    amount;
    currency;
    createdAt;
    user;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PaymentTransaction.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], PaymentTransaction.prototype, "amount", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], PaymentTransaction.prototype, "currency", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], PaymentTransaction.prototype, "createdAt", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.paymentTransactions),
    __metadata("design:type", User)
], PaymentTransaction.prototype, "user", void 0);
PaymentTransaction = __decorate([
    Entity()
], PaymentTransaction);
export { PaymentTransaction };
//# sourceMappingURL=paymentTransaction.entity.js.map