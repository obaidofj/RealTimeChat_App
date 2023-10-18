var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { OneToOne, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity.js';
import { PaymentTransaction } from './paymentTransaction.entity.js';
let Order = class Order {
    id;
    quantity;
    totalAmount;
    createdAt;
    // @ts-ignore
    user;
    paymentTr;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Order.prototype, "quantity", void 0);
__decorate([
    Column({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Order.prototype, "totalAmount", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.orders),
    __metadata("design:type", User)
], Order.prototype, "user", void 0);
__decorate([
    OneToOne(() => PaymentTransaction, { eager: true }),
    JoinColumn(),
    __metadata("design:type", PaymentTransaction)
], Order.prototype, "paymentTr", void 0);
Order = __decorate([
    Entity()
], Order);
export { Order };
//# sourceMappingURL=order.entity.js.map