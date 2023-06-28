import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/entites/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { LoginUserDTO } from './dto/loginUser.dto';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { promises } from 'dns';



@Injectable()
export class AuthService {
  constructor(private readonly userService:UserService,
    @InjectRepository(User) private readonly userRepo:Repository<User>,
   private readonly jwt:JwtService,
   private config:ConfigService){}

    async signUp(dto:AuthDto){
        try {     
            const user = await this.userRepo.create(dto)
            return await this.userRepo.save(user)
            
        } catch (error) {
            if (error.code === '23505') {
                throw new ForbiddenException('Email already exists');
            }
            // Handle other database-related errors
            throw new ForbiddenException('Failed to create user');
        }

    }

    async login(dto:LoginUserDTO){
        //find the user by email
        const user = await this.userRepo.findOne({
          where:{
            email:dto.email
          }
        })
        //if the user  email doesnt exist 
        if(!user) throw new ForbiddenException('User not Found')

        //compare password
        const pwMatches = await bcrypt.compare(dto.password, user.password)

        //if the password is incorrect throw new error
        if(!pwMatches) throw new ForbiddenException('Password Incorrect')

        
        return this.signToken(user)
        
    }


 async signToken(user:User): Promise<{access_token: string}>{
      const payload ={
        email: user.email, 
        sub: user.id ,
      }

     const token = await this.jwt.sign(payload,{
        expiresIn: '15m',
      })
      return{
        access_token:token
      }
    }
}
