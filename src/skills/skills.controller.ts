import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) { }

  @Post()
  create(@Body() dto: CreateSkillDto) {
    return this.skillsService.create(dto);
  }

  @Get()
  findAll() {
    return this.skillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(+id, updateSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillsService.remove(+id);
  }
}
