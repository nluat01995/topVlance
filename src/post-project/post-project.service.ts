import { Injectable } from '@nestjs/common';
import { CreatePostProjectDto } from './dto/create-post-project.dto';
import { UpdatePostProjectDto } from './dto/update-post-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostProject } from './entities/post-project.entity';
import { Between, MoreThan, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { PostProjectConstants } from './constants/post.constant';
import { CategoryService } from 'src/category/category.service';
import { SubCategoryService } from 'src/sub-category/sub-category.service';

@Injectable()
export class PostProjectService {
  constructor(
    @InjectRepository(PostProject) private readonly postProjectRepository: Repository<PostProject>,
    private readonly userService: UsersService,
    private readonly categoryService: CategoryService,
    private readonly subCategoryService: SubCategoryService

  ) { }
  async countNewProjectsToday(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const count = await this.postProjectRepository.count({
      where: {
        createdAt: MoreThan(today),
      },
    });
    return count;
  }

  async countNewProjectsLast7Days(): Promise<number> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const count = await this.postProjectRepository.count({
      where: {
        createdAt: Between(sevenDaysAgo, new Date()),
      },
    });
    return count;
  }
  // Thống kê số lượng dự án theo tháng trong năm hiện tại
  async countProjectsByMonth(year: number): Promise<any> {
    const startOfYear = new Date(year, 0, 1); // 1 January
    const endOfYear = new Date(year + 1, 0, 1); // 1 January next year

    const projects = await this.postProjectRepository
      .createQueryBuilder('postproject')
      .select('EXTRACT(MONTH FROM postproject.createdAt)', 'month')
      .addSelect('COUNT(*)', 'count')
      .where('postproject.createdAt BETWEEN :start AND :end', {
        start: startOfYear,
        end: endOfYear,
      })
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();

    return projects;
  }

  async countNewProjectsLast30Days(): Promise<number> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const count = await this.postProjectRepository.count({
      where: {
        createdAt: Between(thirtyDaysAgo, new Date()),
      },
    });
    return count;
  }

  async createPostProject(userId, createPostProjectDto: CreatePostProjectDto) {
    const objResponse = {
      code: PostProjectConstants.CREATE_SUCCESS.CODE,
      message: PostProjectConstants.CREATE_SUCCESS.MESSAGE
    }
    try {
      const { categoryId, subCategoryId } = createPostProjectDto;

      const category = await this.categoryService.findOne(categoryId);
      const subCategory = await this.subCategoryService.findOne(subCategoryId);
      const user = await this.userService.findOne(userId);
      const newProject = this.postProjectRepository.create({
        ...createPostProjectDto,
        subCategory,
        category,
        user
      })
      const project = await this.postProjectRepository.save(newProject);
      if (!project) {
        return {
          code: PostProjectConstants.CREATE_FAILED.CODE,
          message: PostProjectConstants.CREATE_FAILED.MESSAGE
        }
      }
      return objResponse;
    } catch (error) {
      return {
        code: PostProjectConstants.INTERAL_ERROR.CODE,
        message: PostProjectConstants.INTERAL_ERROR.MESSAGE
      }
    }
  }
  async getProjectList(limit, nextId) {
    try {
      const whereCondition = nextId ? { id: MoreThan(nextId) } : {};
      const projectList = (await this.postProjectRepository.find({
        where: whereCondition,
        order: { id: 'ASC' },
        take: limit,
      }));
      const newNextId = projectList.length > 0 ? projectList[projectList.length - 1].id : null;

      if (!projectList) {
        return {
          code: PostProjectConstants.GET_FAILED.CODE,
          message: PostProjectConstants.GET_FAILED.MESSAGE,
        }
      }
      return {
        code: PostProjectConstants.GET_SUCCESS.CODE,
        message: PostProjectConstants.GET_SUCCESS.MESSAGE,
        data: projectList,
        nextId: newNextId
      }
    } catch (error) {

    }
  }
  async getProjectFindOne(id) {
    return await this.postProjectRepository.findOne({
      where: {
        id
      },
      relations: ['user', 'bids']
    })
  }
}
