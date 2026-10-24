import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './schemas/user';
import { hashPasssword } from 'src/utils/password';
import { CreateUserDto } from "./dto/create-user.dto"

@Injectable()
export class UsersRepository {

  constructor( @InjectModel('user')
    private readonly User: Model<IUser>){}

  async create(userPayload: CreateUserDto) {
    return await this.User.create({
        username:userPayload.username ,
        password:await hashPasssword(userPayload.password),
    })
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return await this.User.findOne({ username });
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
