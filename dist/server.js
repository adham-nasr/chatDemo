import http from 'http';
import { Server } from 'socket.io';
import { Types } from 'mongoose';
import { connectDb } from "./db.js";
import { config } from "./config.js";
import app from "./app.js";
import { MessageRepository } from './repositories/message.repository.js';
import { sendMessageSchema } from './dtos/message.dto.js';
await connectDb();
const messageRepository = new MessageRepository();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
    });
    socket.on('leave_room', (roomId) => {
        socket.leave(roomId);
        console.log(`User ${socket.id} left room ${roomId}`);
    });
    socket.on('send_message', async (data) => {
        try {
            const validatedData = await sendMessageSchema.parseAsync(data);
            const savedMessage = await messageRepository.createMessage({
                sender: new Types.ObjectId(validatedData.sender),
                group: new Types.ObjectId(validatedData.group),
                ...(validatedData.content !== undefined && { content: validatedData.content }),
                ...(validatedData.fileUrl !== undefined && { fileUrl: validatedData.fileUrl }),
                ...(validatedData.fileType !== undefined && { fileType: validatedData.fileType }),
            });
            const populatedMessage = await savedMessage.populate('sender', 'username');
            io.to(validatedData.group).emit('receive_message', populatedMessage);
        }
        catch (error) {
            console.error('Failed to validate or save message:', error);
            socket.emit('error', { message: 'Failed to send message' });
        }
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
server.listen(config.port, () => {
    console.log("server is running on port", config.port);
});
//# sourceMappingURL=server.js.map