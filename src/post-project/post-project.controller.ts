import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { PostProjectService } from './post-project.service';
import { CreatePostProjectDto } from './dto/create-post-project.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as _ from 'lodash'
import { JwtAuthGuard } from 'src/rbac/guards/auth.guard';
import { RolesGuard } from 'src/rbac/guards/roles.guard';
import { Roles } from 'src/rbac/roles.decorator';
import { Role } from 'src/rbac/enums/role.enum';
@ApiTags('PostProject')
@Controller('post-project')

export class PostProjectController {
  constructor(private readonly postProjectService: PostProjectService) { }
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles(Role.FREELANCER)
  @Post()
  async post(@Req() req, @Body() createPostProjectDto: CreatePostProjectDto) {
    const userId = _.get(req, 'user.userId', null)
    return this.postProjectService.createPostProject(userId, createPostProjectDto)
  }
  @Get()
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles(Role.FREELANCER)
  async getProject(@Query('limit') limit = 10, @Query('nextId') nextId = null) {
    return await this.postProjectService.getProjectList(limit, nextId)
  }
  @Get(':id')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles(Role.FREELANCER)
  async getProjectByOne(@Param('id') id: string) {
    return await this.postProjectService.getProjectFindOne(+id)
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
