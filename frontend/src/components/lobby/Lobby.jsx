import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";

const Lobby = () => {
    const { roomId } = useParams();
    const { socket } = useContext(SocketContext);

    const [status, setStatus] = useState("joining"); // joining, joined, error
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!socket) return;

        // Try to join the room on mount and when socket or roomId changes
        socket.emit("join-room", roomId, (response) => {
            if (response.status === "ok") {
                setStatus("joined");
            } else {
                setStatus("error");
                setError(response.error || "Failed to join room");
            }
        });

        // Optional: handle reconnects by re-joining the room automatically
        socket.on("connect", () => {
            socket.emit("join-room", roomId, (response) => {
                if (response.status !== "ok") {
                    setStatus("error");
                    setError(response.error || "Failed to re-join room");
                } else {
                    setStatus("joined");
                    setError(null);
                }
            });
        });

        // Cleanup event listeners on unmount
        return () => {
            socket.off("connect");
        };
    }, [socket, roomId]);

    if (status === "joining") return <div>Joining room...</div>;
    if (status === "error") return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Lobby - Room: {roomId}</h1>
            {/* Render your lobby/game UI here */}
        </div>
    );
};

export default Lobby;
