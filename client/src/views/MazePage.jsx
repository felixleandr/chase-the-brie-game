import GameSettings from "../components/GameSettings";
import background from "../assets/background.jpg";
import GridBoard from "../components/GridBoard";
import PlayerInfo from "../components/PlayerInfo";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import socket from "../../config";

function MazePage() {
  const { roomId } = useParams();
  console.log(roomId);

  useEffect(() => {
    if (roomId) {
      socket.emit("joinRoom", { roomId, access_token: "1223" });
    }
  }, [roomId]);

  return (
    <>
      <div
        className="w-full max-w-[100vw] flex flex-col justify-center items-center"
        style={{ objectFit: "cover", backgroundImage: `url("${background}")`, backgroundRepeat: 'no-repeat' }}
      >
        <div className="px-16 py-11">
          <GameSettings />
          <div className="bg-slate-900 py-5 px-5 pb-10">
            <PlayerInfo />
            <GridBoard socket={socket} roomId={roomId}></GridBoard>
          </div>
        </div>
      </div>
    </>
  );
}

export default MazePage;
