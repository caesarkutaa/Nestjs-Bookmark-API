import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entites/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { configDotenv } from 'dotenv';
import { JwtStrategy } from './strategy/jwt-strategy';
configDotenv

@Module({
  imports:[JwtModule.register({
    secret:`${process.env.JWT_SECRET}`
  }),TypeOrmModule.forFeature([User])],
  providers: [AuthService,UserService,ConfigService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
