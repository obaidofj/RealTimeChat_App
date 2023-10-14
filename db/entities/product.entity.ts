import { JoinTable,BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Order } from './order.entity.js';


@Entity()
export class Product  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToMany(() => Order, {  eager: true })
  @JoinTable()
  orders: Order[]; 
  

  // @ManyToOne(() => User, (user) => user.products)
  // seller: User; 


}
