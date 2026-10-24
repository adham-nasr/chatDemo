import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { GroupsRepository } from './groups.repository.js';
import { MongooseModule } from 'node_modules/@nestjs/mongoose/dist/mongoose.module';
import { GroupSchema } from './schemas/Group';
import { AuthMiddleware } from 'src/common/middelwares/authMiddleware';

@Module({
    imports:[MongooseModule.forFeature([{ name: 'group', schema: GroupSchema }])],
  
  controllers: [GroupsController],
  providers: [GroupsService,GroupsRepository],
  exports: [GroupsRepository]
})
export class GroupsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(GroupsController);
  }

}

