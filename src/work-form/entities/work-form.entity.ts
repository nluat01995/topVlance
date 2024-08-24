import { WorkType } from "@entities/enums/workType.enum";
import { PostProject } from "src/post-project/entities/post-project.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'WorkForm' })
export class WorkForm extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        enum: WorkType,
        default: WorkType.ONLINE
    })
    typeForm: WorkType

    @OneToMany(() => PostProject, postProject => postProject.workForm)
    postProjects: PostProject[]
}
