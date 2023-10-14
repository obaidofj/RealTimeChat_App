import { Entity,BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, Relation, JoinColumn } from 'typeorm';
import { User } from './user.entity.js';

@Entity()
export class ConnectionFriendship  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isAccepted: boolean;

  @ManyToOne(() => User, (user) => user.getInitiatedConnectionFriendship)
  @JoinColumn({ name: 'initiatoUserId' })  
  initiator: Relation<User>; 

  @Column({ name: 'senderid' }) 
  senderid: number; 

  @ManyToOne(() => User, (user) => user.getReceivedConnectionFriendship)
  @JoinColumn({ name: 'recipientUserId' }) 
  recipient: Relation<User>; 

  @Column({ name: 'recipient' }) 
  senderid: number; 


    


}
