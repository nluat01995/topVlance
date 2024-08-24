import { PartialType } from '@nestjs/swagger';
import { CreatePostProjectDto } from './create-post-project.dto';

export class UpdatePostProjectDto extends PartialType(CreatePostProjectDto) {}
