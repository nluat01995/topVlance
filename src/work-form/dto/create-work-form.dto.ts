import { WorkType } from "@entities/enums/workType.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";

export class CreateWorkFormDto {
    @ApiProperty({
        description: 'The type of work',
        enum: WorkType,
        example: WorkType.ONLINE,
    })
    @IsString()
    @IsEnum(WorkType)
    typeForm: WorkType
}
