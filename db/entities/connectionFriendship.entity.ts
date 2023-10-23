import { Entity,BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity.js';

@Entity()
export class ConnectionFriendship  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isAccepted: boolean;
// @ts-ignore

  @ManyToOne(() => User, (user) => user.friendshipsInitiated) 
  initiator: User; 
// @ts-ignore

  @ManyToOne(() => User, (user) => user.friendshipsReceived)
  recipient: User; 


}
