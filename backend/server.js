// ciziktir.io
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import roomRoutes from "./routes/room.route.js";

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

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinRoom', (roomCode) => {
        socket.join(roomCode);
        console.log(`${socket.id} joined room ${roomCode}`);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

app.use(express.json());
app.use('/api/v1/room', roomRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});