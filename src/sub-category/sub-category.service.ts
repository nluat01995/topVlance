import { Injectable } from '@nestjs/common';
import { SubCategory } from '@entities/sub-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { CategoryService } from 'src/category/category.service';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
    private categoryService: CategoryService,
  ) {}

  async findAll() {
    return this.subCategoryRepository.find({
      withDeleted:false
    });
  }

  async findOne(id: number) {
    return this.subCategoryRepository.findOne({ where: { id },withDeleted: false });
  }

  async create(subCategory: CreateSubCategoryDto) {
    const { categoryId, ...sub } = subCategory;
    const category = await this.categoryService.findOne(categoryId);
    const newSubCategory = this.subCategoryRepository.create({
      ...sub,
      category,
    });
    return this.subCategoryRepository.save(newSubCategory);
  }

  async update(updateSubCategoryDto: UpdateSubCategoryDto) {
    const { categoryId, ...updateData } = updateSubCategoryDto;

    const subCategory = await this.subCategoryRepository.findOne({
      where: {
        id: categoryId,
      },
      relations: ['category'],
    });
    if (!subCategory) {
      throw new Error('SubCategory not found');
    }
    if (categoryId !== undefined) {
      const category = await this.categoryService.findOne(categoryId);
      if (!category) {
        throw new Error('Category not found');
      }
      subCategory.category = category;
    }
    Object.assign(subCategory, updateData);
    return await this.subCategoryRepository.save(subCategory);
  }

  async remove(id: number): Promise<void> {
    await this.subCategoryRepository.softDelete(id);
  }
}
