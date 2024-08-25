import { BaseEntity } from "@entities/baseEntity/common.entities";
import { SubCategory } from "@entities/sub-category.entity";
import { PostProject } from "src/post-project/entities/post-project.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Category' })
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
    subCategories: SubCategory[]

    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToMany(() => PostProject, post => post.category)
    posts: PostProject[];

}
