import { useState } from "react";

export function useCreateRoom() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createRoom = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/room", { method: "GET" });
            if (!response.ok) throw new Error("Failed to create room");
            const data = await response.json();
            setLoading(false);
            return data.roomId; // assume API returns { roomId: "abc123" }
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    return { createRoom, loading, error };
}
