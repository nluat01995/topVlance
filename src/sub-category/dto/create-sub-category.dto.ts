import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateSubCategoryDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()

    description: string;
  
    @IsNumber()
    @ApiProperty()

    @IsNotEmpty()
    categoryId: number;
}
