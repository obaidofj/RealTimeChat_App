import { Entity,BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity.js'; 

@Entity()
export class ChatGroup  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, {  eager: true })
  @JoinTable()
  users:User[];
 

}
