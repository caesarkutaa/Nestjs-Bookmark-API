import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
import { EditUserDto } from './dto';



@Injectable()
export class UserService {
constructor( @InjectRepository(User) private readonly userRepo:Repository<User>,){}


async editUser(userId: number, dto: EditUserDto): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id: userId } }); // Retrieve the user by id

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.username = dto.username;
    user.email = dto.email;
    user.password = dto.password; // Update the user properties as needed
    // Update other properties of the user if necessary

    const updatedUser = await this.userRepo.save(user); // Save the updated user


    return updatedUser;
  }
}

