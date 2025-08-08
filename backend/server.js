// ciziktir.io
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 5000;
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*', // allow all for dev
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


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});