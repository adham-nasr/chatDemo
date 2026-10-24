import { 
  WebSocketGateway, 
  SubscribeMessage, 
  MessageBody, 
  ConnectedSocket, 
  WebSocketServer, 
  OnGatewayConnection, 
  OnGatewayDisconnect 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesRepository } from 'src/messages/messages.repository';
import { SendMessageDto } from './dto/send-message.dto';

// Configure CORS here instead of http.createServer
@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Inject your repository via constructor dependency injection
  constructor(private readonly messageRepository: MessagesRepository) {}

  // Handles 'connection' event
  handleConnection(socket: Socket) {
    console.log('A user connected:', socket.id);
  }

  // Handles 'disconnect' event
  handleDisconnect(socket: Socket) {
    console.log('User disconnected:', socket.id);
  }

  // Handles 'join_room' event
  @SubscribeMessage('join_room')
  handleJoinRoom(
    @MessageBody() roomId: string, 
    @ConnectedSocket() socket: Socket
  ) {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  }

  // Handles 'leave_room' event
  @SubscribeMessage('leave_room')
  handleLeaveRoom(
    @MessageBody() roomId: string, 
    @ConnectedSocket() socket: Socket
  ) {
    socket.leave(roomId);
    console.log(`User ${socket.id} left room ${roomId}`);
  }

  // Handles 'send_message' event
  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody() data: SendMessageDto, // NestJS handles validation automatically if using ValidationPipe
    @ConnectedSocket() socket: Socket
  ) {
    try {
      // Create and save the message using the injected repository
      const savedMessage = await this.messageRepository.createMessage({
        sender: data.sender,
        group: data.group,
        ...(data.content !== undefined && { content: data.content }),
        ...(data.fileUrl !== undefined && { fileUrl: data.fileUrl }),
        ...(data.fileType !== undefined && { fileType: data.fileType }),
      });

      const populatedMessage = await savedMessage.populate('sender', 'username');
      
      // Emit to the specific group room
      this.server.to(data.group).emit('receive_message', populatedMessage);
    } catch (error) {
      console.error('Failed to save message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  }
}
