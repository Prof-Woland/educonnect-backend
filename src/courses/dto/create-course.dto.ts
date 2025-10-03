import { IsDecimal, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator"

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    // @IsNumber()
    // @IsNotEmpty()
    // @IsPositive()
    cost: number

    @IsNotEmpty()
    @IsString()
    time: string

    @IsString()
    @IsNotEmpty()
    level: string

    // @IsDecimal()
    // @IsNotEmpty()
    rating: number

    @IsString()
    @IsNotEmpty()
    category: string

    @IsString()
    @IsNotEmpty()
    detailDescription: string

    @IsString()
    @IsNotEmpty()
    teacher: string

    @IsNotEmpty()
    parts: string
}

export class oneDto{
    @IsNotEmpty()
    @IsString()
    id: string
}