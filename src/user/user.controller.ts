import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/Guards/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/entites/user.entity';
import { EditUserDto } from './dto';

@Controller('user')
export class UserController {
    userService: any;  

    @UseGuards(JwtGuard)
    @Get('me')
    getme(@GetUser() user:User){
        return user
    }

    @Patch()
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }

}
