import { Module } from '@nestjs/common';
import { WorkFormService } from './work-form.service';
import { WorkFormController } from './work-form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkForm } from './entities/work-form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkForm])],
  controllers: [WorkFormController],
  providers: [WorkFormService],
})
export class WorkFormModule { }
