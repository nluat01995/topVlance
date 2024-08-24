import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @ApiPropertyOptional({
        default: 'NGUYEN VAN LUAT',
        description: 'Vui Lòng Nhập Tên'
    })
    @IsString()
    @IsOptional()
    fullName?: string

    @ApiPropertyOptional({
        default: '0586016189',
        description: 'Vui Lòng Nhập Phone'
    })
    @IsOptional()
    @IsString()
    phone?: string

    @ApiProperty({
        default: 'nluat134@gmail.com',
        description: 'Vui lòng nhập email'
    })
    @IsEmail()
    @IsString()
    email: string


    @ApiProperty({
        default: '123456',
        description: 'Vui lòng nhập password'
    })
    @IsString()
    password: string
}
