
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';



export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User) private readonly userRepo:Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload:{sub:number,
  email:string}) {
   
    const user = await this.userRepo.findOne({
      where:{
        id:payload.sub
      }
    })
    return user
  }
}