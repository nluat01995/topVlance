import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
    @ApiProperty({
        default: 'IT',
        description:'Tên Danh Mục'
        
    })
    @IsString()
    @IsOptional()
    name?: string;
}
