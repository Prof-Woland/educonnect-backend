import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';


export class UserDto{
    @IsNotEmpty()
    @IsString()
    @Length(2, 128, {message:'Логин должен содержать минимум 2 символа'})
    login: string

    @IsNotEmpty()
    @IsEmail()
    @Length(2, 128)
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(8, 128, {message:'Пароль должен содержать минимум 8 символов'})
    password: string
}

export class AuthDto{
    @IsNotEmpty()
    @IsEmail()
    @Length(2, 128)
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(8, 128, {message:'Пароль должен содержать минимум 8 символов'})
    password: string
}