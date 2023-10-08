import { Entity,BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Message } from './messege.entity.js'; 

@Entity()
export class Attachment  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  mimeType: string;

  @Column()
  size: number;

  @ManyToOne(() => Message, (message) => message.attachments)
  message: Message; 
}
