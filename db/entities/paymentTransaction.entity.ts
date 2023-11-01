// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToOne, JoinColumn, Relation } from 'typeorm';
import { User } from './user.entity.js';
import { Order } from './order.entity.js';

@Entity()
export class PaymentTransaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.paymentTransactions)
  user: User;

  @OneToOne(() => Order, order => order.paymentTr)
  @JoinColumn()
  order: Relation<Order>



}
