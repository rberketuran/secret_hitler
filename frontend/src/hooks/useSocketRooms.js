// src/hooks/useSocketRooms.js
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export function useSocketRooms() {
    const { socket } = useContext(SocketContext);

    const createRoom = () => {
        return new Promise((resolve, reject) => {
            console.log("Creating room...");
            socket.emit("create-room", null, (response) => {
                if (response.status === "ok" && response.roomId) {
                    resolve(response.roomId);
                } else {
                    reject(new Error(response.error || "Failed to create room"));
                }
            });
        });
    };

    const joinRoom = (roomId) => {
        return new Promise((resolve, reject) => {
            socket.emit("join-room", roomId, (response) => {
                if (response.status === "ok") {
                    resolve(roomId);
                } else {
                    reject(new Error(response.error || "Failed to join room"));
                }
            });
        });
    };

    return { createRoom, joinRoom };
}
