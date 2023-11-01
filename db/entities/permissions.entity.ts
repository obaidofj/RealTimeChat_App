// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class Permissions extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string  // "create_post," "edit_user," "delete_comment"

}

