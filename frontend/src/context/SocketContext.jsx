import React, { createContext, useEffect, useState } from "react";
import socket from "../api/socket";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        socket.connect();

        socket.on("connect", () => {
            setConnected(true);
            console.log("Socket connected:", socket.id);
        });

        socket.on("disconnect", () => {
            setConnected(false);
            console.log("Socket disconnected");
        });

        // Cleanup on unmount
        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, connected }}>
            {children}
        </SocketContext.Provider>
    );
};
