import { BaseEntity } from "@entities/baseEntity/common.entities";
import { PostProject } from "src/post-project/entities/post-project.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Bid extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;


    @Column('decimal', { precision: 10, scale: 2 })
    bidAmount: number;

    @CreateDateColumn()
    bidTime: Date;

    @ManyToOne(() => PostProject, postProject => postProject.bids)
    postProject: PostProject

    @ManyToOne(() => User, user => user.bids)
    user: User
}