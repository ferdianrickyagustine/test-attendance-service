import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CheckInDto {
    @IsOptional()
    @IsString()
    notes?: string
}

export class CheckOutDto {
    @IsNotEmpty()
    @IsString()
    notes?: string
}