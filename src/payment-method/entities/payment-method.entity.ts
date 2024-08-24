import { PayType } from "@entities/enums/paymentType.enum";
import { PostProject } from "src/post-project/entities/post-project.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'paymentMethod' })
export class PaymentMethod {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    payment: string; // Sử dụng kiểu enum chính xác

    @Column()
    description: string;

    @OneToMany(() => PostProject, postProject => postProject.payment) // Sửa lại tên thuộc tính quan hệ
    postProjects: PostProject[];
}
