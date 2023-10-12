import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, Column, Unique } from 'typeorm';
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
  sourceUser: User; 

  @ManyToOne(() => User, (user) => user.receivedMuteBlocks)
  affectedUser: User; 
}
