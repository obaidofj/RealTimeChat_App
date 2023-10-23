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
// @ts-ignore

  @ManyToOne(() => User, (user) => user.initiatedMuteBlocks)
<<<<<<< HEAD
  sourceUser: User; 
// @ts-ignore
=======
  @JoinColumn({ name: 'initiatoruserid' }) 
  initiatoruser: Relation<User>; 
 
  @Column({ name: 'initiatoruserid' }) 
  initiatoruserid: number; 
>>>>>>> obaid-controllers

  @ManyToOne(() => User, (user) => user.receivedMuteBlocks)
  @JoinColumn({ name: 'receiveduserid' }) 
  receiveduser: Relation<User>; 

  @Column({ name: 'receiveduserid' }) 
  receiveduserid: number; 
  
}
