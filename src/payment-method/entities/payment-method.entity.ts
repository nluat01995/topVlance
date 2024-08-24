import { PostProject } from "src/post-project/entities/post-project.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'paymentMethod' })
export class PaymentMethod {
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        type: 'enum',
        enum: ['PAY_HOUR', 'PAY_PROJECT', 'PAY_MONTH'],
        default: 'PAY_PROJECT'
    })
    payment: string

    @Column()
    description: string

    @OneToMany(() => PostProject, postProject => postProject.payment)
    postProjects: PostProject[]

}
