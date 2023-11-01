// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, Relation } from 'typeorm';


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

  @Column({
    type: "enum",
    enum: MessegeStatus,
    default: MessegeStatus.SENT,
  })
  status: MessegeStatus;


  // attachments: Attachment[];
}
