import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class BudgetDto {
    @IsDate()
    @Type(() => Number)
    from: number;

    @IsDate()
    @Type(() => Number)
    to: number;
}
export class CreatePostProjectDto {
    @IsNumber()
    @ApiPropertyOptional()
    id_project: number

    @IsString()

    @ApiPropertyOptional()

    startTime: Date

    @ApiPropertyOptional()
    @IsString()
    expireTime: Date

    @IsNumber()
    @ApiPropertyOptional()
    work_form_id: number

    @IsString()
    @ApiPropertyOptional()

    @IsNotEmpty()
    address: string

    @IsNotEmpty()
    @ApiPropertyOptional()

    @Type(() => BudgetDto) // Ensure correct transformation
    budget: BudgetDto;

    @IsString()
    @ApiPropertyOptional()

    @IsNotEmpty()
    post_title: string

    @IsString()
    @ApiPropertyOptional()

    @IsNotEmpty()
    post_description: string



}

