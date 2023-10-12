import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

import { Attachment } from './attachment.entity.js';

import { User } from './user.entity.js'; 


@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.sentMessages, { eager: true }) 
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedMessages, { eager: true  })
  receiver: User;

  attachments: Attachment[]; 

  // @JoinTable()
  // permissions: Permissions[];
  // user: User[];

}
