import { Injectable, UseGuards } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity'; 
import { Repository } from 'typeorm';
import { JwtAuthGuard } from 'src/rbac/guards/auth.guard';
import { RolesGuard } from 'src/rbac/guards/roles.guard';
import { Role } from 'src/rbac/enums/role.enum';
import { Roles } from 'src/rbac/roles.decorator';

@Injectable()
export class SkillsService {
  constructor(@InjectRepository(Skill) private readonly skillRepository: Repository<Skill>) { }

  async create(dto: CreateSkillDto) {
    const skill = this.skillRepository.create(dto);
    return await this.skillRepository.save(skill)
  }

  async findAll() {
    return await this.skillRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} skill`;
  }

  async update(id: number, dto: UpdateSkillDto) {
   const skill = await this.skillRepository.findOne({ where: { id } });

   Object.assign(skill, dto);
   return await this.skillRepository.save(skill);
  }

 async remove(id: number) {
    const skill = await this.skillRepository.findOne({ where: { id } });

    return await this.skillRepository.remove(skill);
  }
}
