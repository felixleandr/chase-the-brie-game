//buat di mazePage
import GameSettings from "../components/GameSettings";
import background from "../assets/background.jpg";
import GridBoard from "../components/GridBoard";
import PlayerInfo from "../components/PlayerInfo";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../config";

function MazePage() {
    const { roomId } = useParams();
    const [players, setPlayers] = useState([]);
    
    console.log(players, 'playerss');
    useEffect(() => {
        let player = { name: localStorage.user };
        if (roomId) {
            socket.emit("joinRoom", {
                roomId,
                access_token: "1223",
                player,
            });

            socket.on('joinRoom',(player) => {
                setPlayers((previousPlayer) => {
                    return [...previousPlayer, player]
                })
            } )
        }
    }, [roomId]);

    return (
        <>
            <div
                className="w-full max-w-[100vw] flex flex-col justify-center items-center"
                style={{
                    objectFit: "cover",
                    backgroundImage: `url("${background}")`,
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="px-16 py-11">
                    <GameSettings />
                    <div className="bg-slate-900 py-5 px-5 pb-10">
                        <PlayerInfo />
                        <GridBoard 
                        socket={socket} 
                        roomId={roomId}
                        players={players}
                        ></GridBoard>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MazePage;
