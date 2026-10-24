import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessagesRepository } from './messages.repository';
import { MessageSchema } from './schemas/message';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupsModule } from 'src/groups/groups.module';
import { AuthMiddleware } from 'src/common/middelwares/authMiddleware';
import { UserSchema } from 'src/users/schemas/user';
import { GroupSchema } from 'src/groups/schemas/Group';


@Module({
    imports:[MongooseModule.forFeature([{ name: 'message', schema: MessageSchema } , { name: 'user', schema: UserSchema } , { name: 'group', schema: GroupSchema }]) , GroupsModule],
  
  controllers: [MessagesController],
  providers: [MessagesService,MessagesRepository],
  exports: [MessagesRepository]
})
export class MessagesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(MessagesController);
  }

}

