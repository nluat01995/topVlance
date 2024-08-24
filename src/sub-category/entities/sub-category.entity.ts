import { Category } from '@entities/category.entity';
import { BaseEntity } from 'src/utils/baseEntity/common.entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, DeleteDateColumn } from 'typeorm';

@Entity()
export class SubCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, (category) => category.subCategories)
  category: Category;

  @DeleteDateColumn()
  deletedAt?: Date;
}
