import { OneToOne,Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity.js'; 
import { Product } from './product.entity.js'; 
import {  PaymentTransaction } from './paymentTransaction.entity.js';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User; 

  @OneToOne(()=>PaymentTransaction , {  eager: true } )
  @JoinColumn()
  paymentTr:PaymentTransaction
}
