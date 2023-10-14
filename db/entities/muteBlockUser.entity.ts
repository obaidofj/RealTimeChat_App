import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, Column, Unique, JoinColumn, Relation } from 'typeorm';
import { User } from './user.entity.js'; 

@Entity()

export class MuteBlockUser  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isMute: boolean;

  @Column()
  isBlock: boolean;

  @ManyToOne(() => User, (user) => user.initiatedMuteBlocks)
  @JoinColumn({ name: 'initiatoruserid' }) 
  initiatoruser: Relation<User>; 

  @Column({ name: 'initiatoruserid' }) 
  initiatoruser: number; 

  @ManyToOne(() => User, (user) => user.receivedMuteBlocks)
  @JoinColumn({ name: 'receiveduserid' }) 
  affecteduser: Relation<User>; 

  @Column({ name: 'receiveduserid' }) 
  senderid: number; 
  
}
