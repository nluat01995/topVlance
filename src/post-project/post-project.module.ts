import { Module } from '@nestjs/common';
import { PostProjectService } from './post-project.service';
import { PostProjectController } from './post-project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostProject } from './entities/post-project.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';
import { CategoryModule } from 'src/category/category.module';
import { SubCategoryModule } from 'src/sub-category/sub-category.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostProject]), UsersModule, CategoryModule, SubCategoryModule],
  controllers: [PostProjectController],
  providers: [PostProjectService],
})
export class PostProjectModule { }
