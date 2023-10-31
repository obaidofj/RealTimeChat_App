// @ts-nocheck
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Order } from "./order.entity.js";
import { Product } from "./product.entity.js";

@Entity()
export class OrderProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Define a many-to-one relationship with Order
  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Relation<Order>;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  product: Relation<Product>;
 
  @Column()
  quantity: number;
}
