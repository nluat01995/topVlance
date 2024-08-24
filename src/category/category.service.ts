import { Category } from '@entities/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['subCategories'] ,withDeleted: false});
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id }, relations: ['subCategories'] });
  }

  async create(category: Partial<Category>): Promise<Category> {
    const newCategory = this.categoryRepository.create(category);
    return this.categoryRepository.save(newCategory);
  }

  async update(id: number, updateCategory: UpdateCategoryDto){
    const category = await this.categoryRepository.findOne({
      where:{
        id
      }
    })
    if(!category){
      throw new Error('Lỗi')
    }
    Object.assign(category,updateCategory);
    return await this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.softDelete(id);
  }
}
