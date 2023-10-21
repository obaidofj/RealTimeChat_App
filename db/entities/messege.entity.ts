import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, Relation } from 'typeorm';

import { Attachment } from './attachment.entity.js';

import { User } from './user.entity.js'; 
import { MessegeType } from '../../types/messege.types.js';


@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  // @Column({
  //   type: "enum",
  //   enum: MessegeType,
  //   default: MessegeType.MESSEGE,
  // })
  // type: MessegeType;

  @Column('simple-array', { nullable: true })
  attachmentsUrls: string[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.sentMessages)
  @JoinColumn({ name: 'senderid' }) 
  sender: Relation<User>;

  @Column({ name: 'senderid' }) 
  senderid: number; 

  @ManyToOne(() => User, (user) => user.receivedMessages)
  @JoinColumn({ name: 'receiverid' }) 
  receiver: Relation<User>;
 
  @Column({ name: 'receiverid' }) 
  receiverid: number; 

  // attachments: Attachment[];
}
