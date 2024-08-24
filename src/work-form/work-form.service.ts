import { Injectable } from '@nestjs/common';
import { CreateWorkFormDto } from './dto/create-work-form.dto';
import { UpdateWorkFormDto } from './dto/update-work-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkForm } from './entities/work-form.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkFormService {
  constructor(@InjectRepository(WorkForm) private readonly workFormRepository: Repository<WorkForm>) { }
  async create(createWorkFormDto: CreateWorkFormDto) {
    return await this.workFormRepository.create(createWorkFormDto);
  }

  async findAll() {
    return await this.workFormRepository.find();
  }

  async findOne(id: number) {
    return await this.workFormRepository.findOne({
      where: {
        id
      }
    })
  }

  async update(id: number, updateWorkFormDto: UpdateWorkFormDto) {
    const workform = await this.workFormRepository.findOne({
      where: {
        id
      }
    })
    if (!workform) { }
    Object.assign(workform, updateWorkFormDto)
    return await this.workFormRepository.save(workform)
  }

  async remove(id: number) {
    return await this.workFormRepository.softDelete(id)
  }
}
