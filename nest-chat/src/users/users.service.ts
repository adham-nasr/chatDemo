import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersRepository } from './users.repository';
import { hashPasssword, verifyPassword } from 'src/utils/password';
import { generateToken } from 'src/utils/jwt';

@Injectable()
export class UsersService {

  constructor(private readonly userRepository: UsersRepository) {}

  async register(createUserDto: CreateUserDto) {
      const existingUser = await this.userRepository.findByUsername(createUserDto.username);
      if (existingUser) {
        throw new UnauthorizedException('Username is already taken');
      }

      // const hashedPassword = await hashPasssword(createUserDto.password);
      
      const user = await this.userRepository.create({
        username: createUserDto.username,
        password: createUserDto.password, // Use the hashed password here
      });

      const token = generateToken({ userId: user._id.toString(), username: user.username });

      return { token, user: { id: user._id, username: user.username } };
  }

  async login(loginUserDto: LoginUserDto){

      const user = await this.userRepository.findByUsername(loginUserDto.username);
      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }

      const isPasswordValid = await verifyPassword(loginUserDto.password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid credentials');
      }

      const token = generateToken({ userId: user._id.toString(), username: user.username });

      return { token, user: { id: user._id, username: user.username } };

  }

  logout(id: string) {
    return `This action removes a #${id} user`;
  }
}
