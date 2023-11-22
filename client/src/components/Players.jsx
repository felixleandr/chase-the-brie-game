import { useEffect, useState } from "react";
import socket from "../config";
import Swal from "sweetalert2";
import Jeremy from "../assets/Jeremy.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { incrementWins } from "../store/actionCreator";

function Players({
    startPoint,
    endPoint,
    gridMap,
    visualizeAlgo,
    roomId,
    playersData,
    generateRandomMaze,
    handleGenerateMaze,
}) {
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

    const navigate = useNavigate();
    const [isStart, setIsStart] = useState(false);
    const [gameType, setGameType] = useState(null)
    const dispatch = useDispatch();
    let [playerPathCount, setCount] = useState(0);

    const [currentPlayerName, setCurrentPlayerName] = useState(
        localStorage.user
    ); //localStorage.user

    const [pathCount, setPathCount] = useState(0);

    const [startPointPosition, setStartPointPosition] = useState({
        row: null,
        col: null,
    });

    useEffect(() => {
        setCount(0);
        if (startPoint) {
            setIsStart(true);
            let newPlayers = playersData.map((el, idx) => {
                el.row = startPoint[idx].row;
                el.col = startPoint[idx].col;
                return el;
            });

            setPlayers(newPlayers);
            // socket.emit("updatePlayer", { newPlayers, roomId });
        }
        socket.on("updatePlayer", (newPlayers) => {
            setPlayers(newPlayers);
        });

        socket.on('playerWinAnnouncement', (currentPlayerName) => {
          Swal.fire(`${currentPlayerName} win !`)
        })

    }, [startPoint]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    });

    const incrementUserWin = async () => {
        try {
          if(!roomId){
            await dispatch(incrementWins({ gameType: "singlePlayerWin" }));
          } else {
            console.log('masuk sini');
            await dispatch(incrementWins({gameType: "multiPlayerWin"}))
          }
        } catch (error) {
            console.log(error);
        }
    };
    const handleKeyPress = (event) => {
        if (startPoint) {
            let index = players.findIndex((x) => x.name === currentPlayerName);

            let newPosition = { ...players[index] };

            // HANDLE ARROW KEY
            switch (event.key) {
                case "ArrowLeft":
                    newPosition.col -= 1;
                    setCount(playerPathCount + 1);
                    break;
                case "ArrowRight":
                    newPosition.col += 1;
                    setCount(playerPathCount + 1);

                    break;
                case "ArrowUp":
                    newPosition.row -= 1;
                    setCount(playerPathCount + 1);

                    break;
                case "ArrowDown":
                    newPosition.row += 1;
                    setCount(playerPathCount + 1);
                    break;
                default:
                    return;
            }
            // console.log(playerPathCount, 'count path player');
            // COLLLISION
            let newPlayers;
            if (!isWallAtPosition(newPosition.row, newPosition.col)) {
              newPlayers = [...players];
              newPlayers[index] = newPosition;
              setPlayers(newPlayers);
              
              socket.emit("updatePlayer", { newPlayers, roomId });
              
            }

            if(roomId){
              if(endPoint.col === newPosition.col && endPoint.row === newPosition.row){
                Swal.fire(`${currentPlayerName} win !`)
                socket.emit('playerWinAnnouncement', {currentPlayerName, roomId})
                incrementUserWin()
              }
            }

            if (isTargetAtPosition(newPosition.row, newPosition.col)) {
                let path = visualizeAlgo();
                if(roomId){
                  if(endPoint.col === newPosition.col && endPoint.row === newPosition.row){
                    Swal.fire(`${currentPlayerName} win !`)
                    socket.emit('playerWinAnnouncement', {currentPlayerName, roomId})
                  }
                } else {
                  if (playerPathCount === path.length - 2 ) {
                    //kurangin 2, karena start and end point tidak di hitung

                    if (roomId) {
                        socket.emit("updatePlayer", { newPlayers, roomId });
                    }

                    incrementUserWin();
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
                    setCount(0);
                  } else {
                    Swal.fire({
                        customClass: {
                            denyButtonText: "swal2-denyButtonText",
                        },
                        title: "Sorry, You Lose !",
                        text: `Your path is : ${playerPathCount}, Shortest path is : ${path.length - 2}`,
                        width: 500,
                        padding: "3em",
                        color: "#716add",
                        backdrop: `
                      rgba(25,72,98);
                      left top
                      no-repeat`,
                        showDenyButton: true,
                        confirmButtonColor: "#6D27D9",
                        // denyButtonColor: "#d33",
                        confirmButtonText: "Try Again",
                        denyButtonText: "Back To Main Menu",
                        denyButtonColor: "#F26379",
                        reverseButtons: true,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            handleGenerateMaze();
                            setCount(0);
                            // navigate("/maze");
                        } else if (result.isDenied) {
                            navigate("/main-menu");
                            setCount(0);
                        }
                    });
                  }
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
                {isStart
                    ? players?.map((player) => {
                          return (
                              <div
                                  style={{
                                      left: 24 * (player.col + 1),
                                      top: 24 * player.row,
                                      position: "absolute",
                                      marginLeft: -5,
                                  }}
                              >
                                  <span className="bg-lime-300 animate-bounce text-xs text-violet-900 px-2 rounded-md absolute -top-3">
                                      {player.name}
                                  </span>
                                  <img
                                      width="22"
                                      height="22"
                                      src={Jeremy}
                                      alt="external-mouse-toy-pet-shop-yogi-aprelliyanto-outline-color-yogi-aprelliyanto"
                                  />
                              </div>
                          );
                      })
                    : ""}
            </div>
        </>
    );
}

export default Players;
