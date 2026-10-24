import { Controller, Get, Post, Body, Patch, Param, Delete ,Req} from '@nestjs/common';
import { UsersService } from '../../domain/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import type { AuthenticationRequest } from 'src/utils/types';

@Controller('api/auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() userPayload: CreateUserDto) {
    return await this.usersService.register(userPayload);
  }

  @Post('/login')
  async login(@Body() userPayload: LoginUserDto) {
    return await this.usersService.login(userPayload);
  }

  @Post('/logout')
  async logout(@Req() request:AuthenticationRequest) {
    const userId = request.user!.userId
    return await this.usersService.logout(userId);
  }
}

