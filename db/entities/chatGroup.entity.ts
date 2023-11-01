// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity.js';

@Entity()
export class ChatGroup extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  users: User[];


}
