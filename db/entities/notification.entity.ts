import { JoinTable,ManyToMany,Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Relation } from 'typeorm';
import { User } from './user.entity.js'; 


@Entity()
export class Notification  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => User, u => u.notifications )
  notificationRecipient: Relation<User>;

}
