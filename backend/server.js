// ciziktir.io
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import { nanoid } from "nanoid"; // or any ID generator you prefer

const PORT = process.env.PORT || 5000;
dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}));
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",

    }
});

const MAX_USERS_PER_ROOM = 5; // example max
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("create-room", (_, callback) => {
        // Generate unique room ID
        const roomId = nanoid(6);

        // You could store room info in memory/db here

        // Join the creator to the room immediately (optional)
        socket.join(roomId);
        console.log(`Socket ${socket.id} created and joined room ${roomId}`);

        // Send back ack with roomId
        callback({ status: "ok", roomId });
    });

    socket.on('join-room', (roomId, callback) => {
        // Check if room exists (your logic here)
        const room = io.sockets.adapter.rooms.get(roomId);

        const numClients = room ? room.size : 0;

        if (!room) {
            callback({ status: 'error', error: 'Room does not exist' });
            return;
        }

        if (numClients > MAX_USERS_PER_ROOM) {
            callback({ status: 'error', error: 'Room is full' });
            return;
        }

        socket.join(roomId);
        console.log(`${socket.id} joined room ${roomId}`);
        callback({ status: 'ok', roomId });
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});