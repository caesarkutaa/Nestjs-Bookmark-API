import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'


export class AuthDto {
    @IsString()
    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    @IsEmail()
    email:string


    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    password:string
}