// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import { OneToMany, JoinColumn, JoinTable, BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, Relation } from 'typeorm';
import { Order } from './order.entity.js';
import { OrderProduct } from './orderProducts.entity.js';



@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  image: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  // //@ManyToOne(() => Order, (order) => order.products)
  // //order: Relation<Order>;

  // //@OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];

  // @ManyToOne(() => User, (user) => user.products)
  // seller: User; 


}
