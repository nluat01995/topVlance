import { PaymentMethod } from "src/payment-method/entities/payment-method.entity"
import { User } from "src/users/entities/user.entity"
import { WorkForm } from "src/work-form/entities/work-form.entity"
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'postProject' })
export class PostProject extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    id_project: number

    @Column()
    startTime: Date

    @Column()
    expireTime: Date

    @Column()
    work_form_id: number


    @Column()
    address: string

    @Column({
        type: 'json'
    })
    budget: {
        from: number,
        to: number
    };


    @Column()
    post_title: string

    @Column()
    post_description: string

    @ManyToOne(() => User, user => user.projects)  // Đảm bảo rằng bạn có quan hệ ManyToOne nếu user có nhiều projects
    user: User;

    @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.postProjects)
    payment: PaymentMethod

    @ManyToOne(() => WorkForm, workform => workform.postProjects)
    workForm: WorkForm
}
