import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, Relation } from 'typeorm';

import { Attachment } from './attachment.entity.js';

import { User } from './user.entity.js'; 
import { MessegeStatus } from '../../types/messege.types.js';


@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;


  @Column('simple-array', { nullable: true })
  attachmentsUrls: string[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
// @ts-ignore

<<<<<<< HEAD
  @ManyToOne(() => User, (user) => user.sentMessages, { eager: true }) 
  sender: User;
// @ts-ignore
=======
  @ManyToOne(() => User, (user) => user.sentMessages)
  @JoinColumn({ name: 'senderid' }) 
  sender: Relation<User>;
>>>>>>> obaid-controllers

  @Column({ name: 'senderid' }) 
  senderid: number; 

  @ManyToOne(() => User, (user) => user.receivedMessages)
  @JoinColumn({ name: 'receiverid' }) 
  receiver: Relation<User>;
 
  @Column({ name: 'receiverid' }) 
  receiverid: number; 

  @Column({
    type: "enum",
    enum: MessegeStatus,
    default: MessegeStatus.SENT,
  })
  status: MessegeStatus;

  
  // attachments: Attachment[];
}
