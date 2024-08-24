import { Injectable } from '@nestjs/common';
import { CreatePostProjectDto } from './dto/create-post-project.dto';
import { UpdatePostProjectDto } from './dto/update-post-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostProject } from './entities/post-project.entity';
import { MoreThan, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/rbac/enums/role.enum';
import { PostProjectConstants } from './constants/post.constant';

@Injectable()
export class PostProjectService {
  constructor(
    @InjectRepository(PostProject) private readonly postProjectRepository: Repository<PostProject>,
    private readonly userService: UsersService

  ) { }

  async createPostProject(userId, createPostProjectDto: CreatePostProjectDto) {
    const objResponse = {
      code: PostProjectConstants.CREATE_SUCCESS.CODE,
      message: PostProjectConstants.CREATE_SUCCESS.MESSAGE
    }
    try {
      const user = await this.userService.findOne(userId);
      const newProject = this.postProjectRepository.create({
        ...createPostProjectDto,
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
        take: limit
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
}
