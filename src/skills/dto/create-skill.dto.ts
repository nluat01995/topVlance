import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSkillDto {
    @ApiProperty({
        default: 'php',
        description: 'Mô tả kỹ năng'
    })
    @IsString()
    name: string

}
