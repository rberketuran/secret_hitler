import { useNavigate } from "react-router-dom";
import { useSocketRooms } from "../../hooks/useSocketRooms"; // adjust path

const CreateRoom = () => {
    const navigate = useNavigate();
    const { createRoom, loading, error } = useSocketRooms();

    const handleCreate = async () => {
        try {
            const roomId = await createRoom();
            navigate(`/room/${roomId}`);
        } catch {
            // error handled in hook and optionally here
        }
    };

    return (
        <div className="w-full max-w-xs min-h-[16rem] rounded-lg shadow-md bg-gray-400 p-4 box-border flex flex-col justify-center items-center cursor-pointer select-none"
            onClick={handleCreate}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleCreate();
            }}
        >
            <h1 className="text-xl mb-4">Create Room</h1>
            {loading && <p>Creating room...</p>}
            {error && <p className="text-red-600">{error.message}</p>}
            {!loading && !error && <p>Click here to create a new room</p>}
        </div>
    );
};

export default CreateRoom;
