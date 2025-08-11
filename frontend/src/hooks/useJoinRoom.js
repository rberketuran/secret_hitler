import { useState } from "react";

export function useJoinRoom() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const joinRoom = async (roomId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/v1/room/join`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ roomId }), // sending roomId in body
            });
            if (!response.ok) throw new Error("Failed to join room");
            const data = await response.json();
            setLoading(false);
            return data.roomId; // assume API returns { roomId: "abc123" }
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    return { joinRoom, loading, error };
}