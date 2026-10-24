import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('api/groups')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}


  @Get(':id/messages')
  async findAll(@Req() req: any, @Param('id') id: string) {
    try {
      const groupId = id;
      const userId = req.user?.userId;
      console.log("Finding messages for group:");
      console.log('Group ID:', groupId);
      console.log('User ID:', userId);

      if (!userId) {
        return new UnauthorizedException('User not authenticated');
      }

      const messages = await this.messagesService.getGroupMessages(groupId, userId);

      return messages;
    } catch (error) {
      console.log("Error fetching messages:", error);
      return new UnauthorizedException("an error occurred while fetching messages: ");
    }
  }

}
