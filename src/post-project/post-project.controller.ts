import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { PostProjectService } from './post-project.service';
import { CreatePostProjectDto } from './dto/create-post-project.dto';
import { UpdatePostProjectDto } from './dto/update-post-project.dto';
import { ApiTags } from '@nestjs/swagger';
import * as _ from 'lodash'
import { JwtAuthGuard } from 'src/rbac/guards/auth.guard';
import { RolesGuard } from 'src/rbac/guards/roles.guard';
import { Roles } from 'src/rbac/roles.decorator';
import { Role } from 'src/rbac/enums/role.enum';
@ApiTags('PostProject')
@Controller('post-project')
export class PostProjectController {
  constructor(private readonly postProjectService: PostProjectService) { }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.RECUIT, Role.ADMIN, Role.FREELANCER)
  @Post()
  async post(@Req() req, @Body() createPostProjectDto: CreatePostProjectDto) {
    return this.postProjectService.createPostProject(req.userId, createPostProjectDto)
  }

  @Get('count/today')
  async getCountToday() {
    return this.postProjectService.countNewProjectsToday();
  }

  @Get('count/last-7-days')
  async getCountLast7Days() {
    return this.postProjectService.countNewProjectsLast7Days();
  }

  @Get('count/last-30-days')
  async getCountLast30Days() {
    return this.postProjectService.countNewProjectsLast30Days();
  }
  @Get('count/by-month')
  async getCountByMonth(@Query('year') year: number) {
    if (!year) {
      throw new Error('Year parameter is required');
    }
    return this.postProjectService.countProjectsByMonth(year);
  }

}
