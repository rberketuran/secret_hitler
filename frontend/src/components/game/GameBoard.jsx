import React, { useEffect } from "react";
import useSocket from "../../hooks/useSocket";

const GameBoard = () => {
    const { socket, connected } = useSocket();

    useEffect(() => {
        if (!connected) return;

        socket.emit("join-room", { roomId: "game123" });

        socket.on("gameState", (state) => {
            console.log("Game state updated:", state);
            // Update your component state here
        });

        return () => {
            socket.off("gameState");
        };
    }, [connected, socket]);

    return <div>{connected ? "Connected to game" : "Connecting..."}</div>;
};

export default GameBoard;
