import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';

import { Attachment } from './attachment.entity.js';

import { User } from './user.entity.js'; 


@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.getSentMessages)
  @JoinColumn({ name: 'senderid' }) 
  sender: User;

  @Column({ name: 'senderid' }) 
  senderid: number; 

  @ManyToOne(() => User, (user) => user.getReceivedMessages)
  @JoinColumn({ name: 'receiverid' }) 
  receiver: User;
 
  @Column({ name: 'receiverid' }) 
  receiverid: number; 

  attachments: Attachment[];
}
