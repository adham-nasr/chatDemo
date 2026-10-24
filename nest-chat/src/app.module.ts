import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { GroupsModule } from './groups/groups.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';
import { join } from 'path/win32';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      // Point this to the folder containing your index.html
      rootPath: join(__dirname, '..', 'public'), 
      // Optional: This means your index.html will be served at http://localhost:3000/
      serveRoot: '/', 
    }),
    MongooseModule.forRoot(
      'mongodb://localhost:27017/chatapp2',
    ),
    UsersModule, MessagesModule, GroupsModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
