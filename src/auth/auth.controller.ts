import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/entites/user.entity';
import { LoginUserDTO } from './dto/loginUser.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

  
    @Post('register')
    signUp(@Body() dto:AuthDto){
        return this.authService.signUp(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() dto:LoginUserDTO){
        return this.authService.login(dto)
    }

}
