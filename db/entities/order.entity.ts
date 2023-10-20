import { OneToOne,Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, Relation, OneToMany, BaseEntity } from 'typeorm';
import { User } from './user.entity.js'; 
import { Product } from './product.entity.js'; 
import {  PaymentTransaction } from './paymentTransaction.entity.js';
import { OrderProduct } from './orderProducts.entity.js';

@Entity()
export class Order extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  // @OneToOne(()=>Product , product=>product.order )
  // product:Product

  // @Column()
  // quantity: number;
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProducts: OrderProduct[];

  @Column()
  totalQuantity: number; 
  
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  // @OneToMany(() => Product, (product) => product.order)
  // products: Product[];



  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;


  @OneToOne(()=>PaymentTransaction , {  eager: true ,nullable:true } )
  @JoinColumn()
  paymentTr:Relation<PaymentTransaction>
}
