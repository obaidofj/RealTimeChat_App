import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
 


@Entity()
export class Flags extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seeded : boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  

}
