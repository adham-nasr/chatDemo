import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { hashPasssword, verifyPassword } from 'src/utils/password';
import { generateToken } from 'src/utils/jwt';
import { User } from './usermodel';
import { IUsersRepository } from 'src/users/ports/out/repository';
import { CreateUserDto } from '../adapters/in/dto/create-user.dto';
import { LoginUserDto } from '../adapters/in/dto/login-user.dto';

@Injectable()
export class UsersService {

  constructor(private readonly userRepository: IUsersRepository) {}

  async register(userPayload: CreateUserDto) {
      const domainUser = new User(userPayload.username, userPayload.password);

      const existingUser = await this.userRepository.findByUsername(domainUser);
      if (existingUser) {
        throw new UnauthorizedException('Username is already taken');
      }

      // const hashedPassword = await hashPasssword(createUserDto.password);
      
      const new_user = await this.userRepository.create(domainUser);

      const token = generateToken({ userId: new_user.id.toString(), username: new_user.username });

      return { token, user: { id: new_user.id, username: new_user.username } };
  }

  async login(userPayload: LoginUserDto) {

      const domainUser = new User(userPayload.username, userPayload.password);


      const ret_user = await this.userRepository.findByUsername(domainUser);
      if (!ret_user) {
        throw new BadRequestException('Invalid credentials');
      }

      const isPasswordValid = await verifyPassword(domainUser.password, ret_user.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid credentials');
      }

      const token = generateToken({ userId: ret_user.id.toString(), username: ret_user.username });

      return { token, user: { id: ret_user.id, username: ret_user.username } };

  }

  logout(id: string) {
    return `This action removes a #${id} user`;
  }
}
