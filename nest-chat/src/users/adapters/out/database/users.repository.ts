import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './user';
import { hashPasssword } from 'src/utils/password';
import { CreateUserDto } from "../../in/dto/create-user.dto"
import { IUsersRepository } from 'src/users/ports/out/repository';
import { User } from '../../../domain/usermodel';
import { UserMapper } from './user.mapper';

@Injectable()
export class UsersRepository implements IUsersRepository {

  constructor( @InjectModel('user')
    private readonly User: Model<IUser>){}

  async create(domainUser: User) {
    const dbUser = UserMapper.toPersistence(domainUser);
    const temp =  await this.User.create({
        username:dbUser.username, 
        password:await hashPasssword(dbUser.password),
    })
    return UserMapper.toDomain(temp);
  }

  async findByUsername(domainUser: User) {
    const dbUser = UserMapper.toPersistence(domainUser);
    const temp = await this.User.findOne({ username: dbUser.username });
    return UserMapper.toDomain(temp);
  }

  async findAll() {
    this.User.find
    // return `This action returns all users`;
  }

//   async findByEmail(email: string)
//   {
//     return await this.User.findOne({email:email})
//   }


}
