// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';



@Entity()
export class Flags extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  flag: string;

  @Column()
  value: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;



}
