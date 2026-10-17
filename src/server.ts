import http from 'http';
import { Server } from 'socket.io';
import { connectDb } from "./db.js";
import { config } from "./config.js";
import app from "./app.js";

await connectDb();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join_room', (roomId: string) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on('leave_room', (roomId: string) => {
        socket.leave(roomId);
        console.log(`User ${socket.id} left room ${roomId}`);
    });

    socket.on('send_message', (data) => {
        io.to(data.group).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(config.port, () => {
    console.log("server is running on port", config.port);
});
