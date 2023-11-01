// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity.js';

@Entity()
export class UserSockets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  socketId: string; // Socket.io socket ID

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
