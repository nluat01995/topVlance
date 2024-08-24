import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({
        default: 'IT',
        description:'Tên Danh Mục'
        
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
