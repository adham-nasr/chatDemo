import { Module } from '@nestjs/common';
import { UsersService } from './domain/users.service';
import { UsersController } from './adapters/in/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from './adapters/out/database/user';
import { UsersRepository } from './adapters/out/database/users.repository';
import { IUsersRepository } from './ports/out/repository';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    }
  ],
})
export class UsersModule {}
