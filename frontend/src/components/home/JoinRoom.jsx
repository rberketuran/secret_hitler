import React from 'react';
import { useJoinRoom } from '../../hooks/useJoinRoom';
import { useState } from 'react';

const JoinRoom = ({ children, className = '' }) => {
    const { joinRoom, loading, error } = useJoinRoom();
    const [roomId, setRoomId] = useState('');

    const handleJoinRoom = async () => {
        try {
            await joinRoom(roomId);
            // Handle successful room join (e.g., navigate to room)
        } catch (err) {
            console.error("Failed to join room:", err);
        }
    };

    return (
        <div className="w-full max-w-xs min-h-[16rem] rounded-lg shadow-md bg-gray-400 p-4 box-border flex flex-col justify-center items-center gap-4">

            {children}
            <h1>Join Room</h1>
            <p>Enter Room ID:</p>
            <input type="text" className="border border-gray-300 rounded-md p-2 bg-gray-200 w-3/4 text-gray-700"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)} />
            <button className="bg-blue-500 text-white rounded-md p-2 w-3/4"
                onClick={handleJoinRoom}>Join</button>
        </div>
    );
};

export default JoinRoom;
