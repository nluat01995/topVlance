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
    Id_project: number

    @IsDate()
    startTime: Date

    @IsDate()
    expireTime: Date

    @IsNumber()
    work_form_id: number

    @IsString()
    @IsNotEmpty()
    address: string

    @IsNotEmpty()
    @Type(() => BudgetDto) // Ensure correct transformation
    budget: BudgetDto;

    @IsString()
    @IsNotEmpty()
    post_title: string

    @IsString()
    @IsNotEmpty()
    post_description: string



}

