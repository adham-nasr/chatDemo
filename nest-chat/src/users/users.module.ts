import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from './schemas/user';
import { UsersRepository } from './users.repository';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService,UsersRepository],
})
export class UsersModule {}
