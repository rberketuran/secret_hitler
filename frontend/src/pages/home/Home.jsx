import GameBoard from "../../components/game/GameBoard";
import CreateRoom from "../../components/home/CreateRoom";
import JoinRoom from "../../components/home/JoinRoom";

const Home = () => {
    return (
        <div className="w-full">
            {/* <GameBoard /> */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 w-full">
                <CreateRoom />
                <JoinRoom />
            </div>

        </div>
    );
};

export default Home;
