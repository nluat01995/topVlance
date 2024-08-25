import { Category } from "@entities/category.entity"
import { SubCategory } from "@entities/sub-category.entity"
import { Bid } from "src/bids/entities/bid.entity"
import { PaymentMethod } from "src/payment-method/entities/payment-method.entity"
import { User } from "src/users/entities/user.entity"
import { WorkForm } from "src/work-form/entities/work-form.entity"
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

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

    @OneToMany(() => Bid, bid => bid.postProject)
    bids: Bid[]


    @ManyToOne(() => Category, category => category.posts)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @ManyToOne(() => SubCategory, subCategory => subCategory.posts)
    @JoinColumn({ name: 'sub_category_id' })
    subCategory: SubCategory;
}
