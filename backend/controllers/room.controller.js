import { joinSocketRoom } from '../sockets/room.socket.js';
export const createRoom = async (req, res) => {
    // Logic to create a room
};

export const joinRoom = async (req, res) => {
    try {
        const { roomId } = req.body;
        joinSocketRoom(roomId);
        res.status(200).json({ message: `Joined room: ${roomId}` });
    } catch (error) {
        console.error("Error joining room:", error);
        res.status(500).json({ error: "Failed to join room" });
    }
};
