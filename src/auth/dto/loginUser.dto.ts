import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'


export class LoginUserDTO{
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    password:string
}