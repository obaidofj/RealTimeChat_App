import { Entity,BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, Relation, JoinColumn } from 'typeorm';
import { User } from './user.entity.js';
import { connStatus } from '../../types/connection.types.js';

@Entity()
export class ConnectionFriendship  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

<<<<<<< HEAD
  @Column({ default: false })
  isAccepted: boolean;
// @ts-ignore

  @ManyToOne(() => User, (user) => user.friendshipsInitiated) 
  initiator: User; 
// @ts-ignore
=======
  @Column()
  status: connStatus;

  @ManyToOne(() => User, (user) => user.initiatedConnectionFriendship)
  @JoinColumn({ name: 'initiatoUserId' })  
  initiator: Relation<User>;  
>>>>>>> obaid-controllers

  @Column({ name: 'initiatoUserId' }) 
  initiatoUserId: number; 

  @ManyToOne(() => User, (user) => user.receivedConnectionFriendship)
  @JoinColumn({ name: 'recipientUserId' }) 
  recipient: Relation<User>; 

  @Column({ name: 'recipientUserId' }) 
  recipientUserId: number; 


}
