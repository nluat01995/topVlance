import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBidDto {
    @ApiProperty()
    @IsNumber()
    bidAmount: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()

    bidTime: string;

    @IsNumber()
    @ApiProperty()

    postId: number

    @IsNumber()
    @ApiProperty()
    userId: number
}
