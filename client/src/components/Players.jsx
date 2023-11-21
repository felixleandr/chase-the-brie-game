import { useEffect, useState } from "react";
import socket from "../config";
import Swal from "sweetalert2";
import Jeremy from '../assets/Jeremy.png'


function Players({ startPoint, gridMap, visualizeAlgo, roomId, playersData }) {
    const [players, setPlayers] = useState([
        {
            name: "budi",
            row: null,
            col: null,
        },
        {
            name: "kaka",
            row: null,
            col: null,
        },
    ]);

    const [isStart, setIsStart] = useState(false)
    // console.log(startPoint, 'start point');
    let [playerPathCount, setCount] = useState(null);
    const [currentPlayerName, setCurrentPlayerName] = useState(
        localStorage.user
    ); //localStorage.user

    const [pathCount, setPathCount] = useState(null);

    const [startPointPosition, setStartPointPosition] = useState({
        row: null,
        col: null,
    });

    useEffect(() => {
        if (startPoint) {
            setIsStart(true)
            let newPlayers = playersData.map((el, idx) => {
                el.row = startPoint[idx].row
                el.col = startPoint[idx].col
                return el
            })

            setPlayers(newPlayers);
            socket.emit("updatePlayer", {newPlayers, roomId})

        }
        socket.on("updatePlayer", (newPlayers) => {
            setPlayers(newPlayers)
        })

    }, [startPoint]);

    useEffect(() => {
        // console.log(pathCount, 'iniii');
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    });

    const handleKeyPress = (event) => {
        console.log(event.key);

        if (startPoint) {
            let index = players.findIndex((x) => x.name === currentPlayerName);

            let newPosition = { ...players[index]};

            // HANDLE ARROW KEY
            switch (event.key) {
                case "ArrowLeft":
                    newPosition.col -= 1;
                    // setCount(playerPathCount + 1);
                    break;
                case "ArrowRight":
                    newPosition.col += 1;

                    // setCount(playerPathCount + 1);

                    break;
                case "ArrowUp":
                    newPosition.row -= 1;
                    // setCount(playerPathCount + 1);

                    break;
                case "ArrowDown":
                    newPosition.row += 1;
                    // setCount(playerPathCount + 1);
                    break;
                default:
                    return;
            }
           

            // COLLLISION
            if (!isWallAtPosition(newPosition.row, newPosition.col)) {
                let newPlayers = [...players];
                newPlayers[index] = newPosition;
                setPlayers(newPlayers);

                socket.emit('updatePlayer', {newPlayers, roomId})
            }

            if (isTargetAtPosition(newPosition.row, newPosition.col)) {
                let path = visualizeAlgo();

                if (playerPathCount <= path.length) {
                    // useDispatch(incrementWins({gameType: 'singlePlayerWin'}))
                    // incrementUserWin();
                    Swal.fire({
                        title: "Congrats ! You Win !",
                        width: 500,
                        padding: "3em",
                        color: "#716add",
                        backdrop: `
                    rgba linear-gradient(4deg, rgba(25,72,98,1) 0%, rgba(0,0,0,1) 50%);
                    left top
                    no-repeat
                  `,
                    });
                } else {
                    Swal.fire({
                        title: "Sorry, Try Again !",
                        width: 500,
                        padding: "3em",
                        color: "#716add",
                        backdrop: `
                    rgba(25,72,98);
                    left top
                    no-repeat
                  `,
                    });
                }
            }
        }
    };

    const isTargetAtPosition = (row, col) => {
        const cell = gridMap[row][col];
        const isEndPoint = cell.isEndPoint;
        return isEndPoint;
    };

    const isWallAtPosition = (row, col) => {
        const cell = gridMap[row][col];
        const isWall = cell.isWall;
        // console.log("is wall : " ,isWall );
        return isWall;
    };

    return (
        <>
            <div className="absolute top-0 left-0 right-0 bottom-0">
            {isStart ? players?.map((player) => {
                    return (
                        <img
                            style={{
                                left: 24 * (player.col + 1),
                                top: 24 * player.row,
                                position: "absolute",
                                marginLeft: -5,
                            }}
                            width="22"
                            height="22"
                            src={Jeremy}
                            alt="external-mouse-toy-pet-shop-yogi-aprelliyanto-outline-color-yogi-aprelliyanto"
                        />
                    );
                }) : "" }
            </div>
        </>
    );
}

export default Players;
