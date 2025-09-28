import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';


export class UserDto{
    @IsNotEmpty()
    @IsString()
    @Length(2, 128)
    login: string

    @IsNotEmpty()
    @IsEmail()
    @Length(2, 128)
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(8, 128)
    password: string
}

export class AuthDto{
    @IsNotEmpty()
    @IsEmail()
    @Length(2, 128)
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(8, 128)
    password: string
}