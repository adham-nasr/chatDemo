import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IMessage } from "./schemas/message";
import { hashPasssword } from 'src/utils/password';
import { CreateMessageDto } from "./dto/create-message.dto"

@Injectable()
export class MessagesRepository {

  constructor( @InjectModel('message')
    private readonly Message: Model<IMessage>){}

  async findMessagesByGroupId(groupId: string): Promise<IMessage[]> {
    return await this.Message.find({ group: new Types.ObjectId(groupId) })
      .populate('sender', 'username')
      .sort({ createdAt: 1 });
  }

  async createMessage(messageData: CreateMessageDto) {
    return await this.Message.create(messageData);
  }


}
