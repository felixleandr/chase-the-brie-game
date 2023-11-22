import React, { useEffect, useRef, useState } from "react";
import { getCellObjects, getPath } from "../utils/helpers";
import { BFS, generateRandomMaze } from "../app/index";
import Cell from "./Cell";
import { useDispatch } from "react-redux";
import Players from "./Players";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function GridBoard({ socket, roomId, players }) {
    const gridBoardCells = useRef(getCellObjects());
    const [startPoint, setStartPoint] = useState(null);
    // state bentuk array isinya player 1 & 2
    // menerima state isMultiplayer
    const [endPoint, setEndPoint] = useState(null);
    const [renderFlag, setRenderFlag] = useState(false);
    const [foundPath, setFoundPath] = useState(null);
    const [gridMap, setGridMap] = useState(null);
    const [pathCount, setPathCount] = useState(null);

    const [isMultiPlayer, setIsMultiPlayer] = useState(true);

    const [cellsScanned, setCellsScanned] = useState(0);
    const [cellsTraveled, setCellsTraveled] = useState(0);
    const [timeTaken, setTimeTaken] = useState(0);

    const [startPointPosition, setStartPointPosition] = useState({
        row: null,
        col: null,
    });

    let [playerPathCount, setCount] = useState(null);

    // let newPosition = { ...startPointPosition };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clearBoard = () => {
        gridBoardCells.current = getCellObjects(
            true,
            true,
            gridBoardCells.current
        );
        resetBoardData();
    };

    const resetBoardData = () => {
        document.querySelectorAll(`.cell`).forEach((item) => {
            if (item.classList.contains("cell-visited")) {
                item.classList.remove("cell-visited");
            }
            if (item.classList.contains("cell-path")) {
                item.classList.remove("cell-path");
            }
        });
        setFoundPath(null);
        setCellsScanned(0);
        setCellsTraveled(0);
        setTimeTaken(0);
    };

    const animateAlgo = (visitedCells, path) => {
        for (let i = 0; i < visitedCells.length; i++) {
            setTimeout(() => {
                const cell = visitedCells[i];
                // console.log(cell, 'asdfasdfa');
                let item = document.getElementById(
                    `cell-${cell.row}-${cell.col}`
                );
                if (item) {
                    item.className += " cell-visited";
                }
                if (cell.isTarget) {
                    setFoundPath(path);
                }
            }, 3 * i);
        }
    };

    const animatePath = (path) => {
        for (let i = 0; i < path.length; i++) {
            setTimeout(() => {
                const cell = path[i];
                setCellsTraveled(i + 1);
                let item = document.getElementById(
                    `cell-${cell.row}-${cell.col}`
                );
                if (item) {
                    item.className += " cell-path";
                }
            }, 20 * i);
        }
    };
    let grid;

    const getDistance = () => {
        grid = gridBoardCells.current;
        let start = grid[startPoint.row][startPoint.col];
        let end = grid[endPoint.row][endPoint.col];
        
        const path = getPath(end);
        return path;
    };
    
    const [currentPlayerName, setCurrentPlayerName] = useState(localStorage.user); //localStorage.user
    
//   console.log(currentPlayerName, 'current player');

    const visualizeAlgo = () => {
        let start;
        // grid = gridBoardCells.current;
        let gridVisualize = gridBoardCells.current;
        // console.log(players, startPoint, "players, start point");

        if (roomId) {

            let index = startPoint.findIndex((x) => x.playername === currentPlayerName);
            console.log(index, currentPlayerName, 'index');

            start = gridVisualize[players[index].row][players[index].col]
        } else {
            start = gridVisualize[startPoint[0].row][startPoint[0].col];
        }

        console.log(startPoint, "start");
        console.log(endPoint, "end");

        // let end = JSON.parse(JSON.stringify(gridVisualize[endPoint.row][endPoint.col]));
        let end = gridVisualize[endPoint.row][endPoint.col]

        console.log(end, 'end <<<');
        let visitedCells = [];

        let [BFSCells, BFSTime] = BFS(gridVisualize, start, end) || [];
        // let a = BFS(grid, start, end) || [];
        visitedCells = BFSCells || [];

        // setTimeTaken(BFSTime || 0);

        const path = getPath(end);

        // setCellsScanned(visitedCells.length);
        animateAlgo(visitedCells, path);
        return path;
    };

    const handleGenerateMaze = () => {
        if(!roomId){
            setTimeLeft(30)
        }
        setRenderFlag(!renderFlag);
        clearBoard(); // just to be sure that board and path is cleared
        let playerCount;

        if (roomId) {
            setIsMultiPlayer(true);
            playerCount = players.length;
        } else {
            setIsMultiPlayer(false);
            playerCount = 1;
        }

        const startAndEndPoint = generateRandomMaze(
            gridBoardCells.current,
            isMultiPlayer,
            playerCount
        );

        const gridBoard = gridBoardCells.current;
        
        startAndEndPoint.startCellArr.forEach((el, idx) => {
            el.playername = players[idx].name
        })
        
        setStartPoint(startAndEndPoint.startCellArr);
        setEndPoint(startAndEndPoint.endCell);
        setGridMap({ current: gridBoardCells.current });

        if(!roomId){
            startTimer();
        }
        socket.emit("playGame", { startAndEndPoint, roomId, gridBoard });
    };

    const [timeLeft, setTimeLeft] = useState(30);
    const [timerRunning, setTimerRunning] = useState(false);
    const text = "Time(s) remaining : ";

    const startTimer = () => {
        setTimerRunning(!timerRunning);
    };

    const stopTimer = () => {
        setTimerRunning(!timerRunning);
    };

    useEffect(() => {
        let timer;

        if (timerRunning) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime === 0) {
                        stopTimer();
                        handleTimeOut(); // Panggil fungsi ketika waktu habis
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [timerRunning]); //eslint-disable-line

    const handleTimeOut = () => {
        Swal.fire({
            customClass: {
                denyButtonText: "swal2-denyButtonText",
            },
            title: "Sorry, Time's Up !",
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
                setTimeLeft(30)
                // navigate("/maze");
            } else if (result.isDenied) {
                navigate("/main-menu");
            }
        });
    };

    useEffect(() => {
        if (foundPath && startPoint && endPoint) {
            animatePath(foundPath);
        }
    }, [foundPath]);

    useEffect(() => {
        socket.on("playGame", (roomData) => {
            setRenderFlag(!renderFlag);
            clearBoard();

            setStartPoint(roomData.startAndEndPoint.startCellArr);

            console.log(roomData, "room data");
            console.log(roomData.startAndEndPoint.startCellArr, "room data star end point");

            setEndPoint(roomData.startAndEndPoint.endCell);

            setGridMap({ current: roomData.gridBoard });
            gridBoardCells.current = roomData.gridBoard;
        });
    }, []); //eslint-disable-line

    return (
        <>
            <div className="w-full bg-gray-900 pb-4">
                <div className="flex md:gap-0 flex-wrap gap-4 flex-1 pt-4 max-w-7xl md:flex-row flex-col items-start md:items-center justify-between space-x-4 mx-auto font-Rubik pr-4">
                    <button
                        className="items-center w-fit ml-4 disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex bg-gray-600 text-[15px] text-white px-4 py-2 rounded-md"
                        onClick={handleGenerateMaze}
                    >
                        Generate random maze
                    </button>
                    {!isMultiPlayer && <p className="text-white text-sm">
                        {text}
                        {timeLeft} seconds
                    </p>
                    }
                    {!isMultiPlayer && (
                        <button
                            onClick={() => visualizeAlgo()}
                            className="items-center w-fit disabled:bg-indigo-400 disabled:cursor-not-allowed inline-flex bg-lime-300 text-[15px] text-indigo-800 px-4 py-2 rounded-md"
                        >
                            Give Up
                        </button>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-gridmap relative overflow-auto w-full px-4 justify-start md:justify-center items-center my-3">
                {gridBoardCells.current.map((row, rowIndex) => {
                    return (
                        <React.Fragment key={rowIndex}>
                            {row.map((cell, colIndex) => {
                                return (
                                    <Cell
                                        startPoint={startPoint}
                                        endPoint={endPoint}
                                        getDistance={getDistance}
                                        visualizeAlgo={visualizeAlgo}
                                        pathCount={pathCount}
                                        map={gridMap}
                                        key={colIndex}
                                        id={`cell-${cell.row}-${cell.col}`}
                                        {...cell}
                                    />
                                );
                            })}
                        </React.Fragment>
                    );
                })}
                <Players
                    startPoint={startPoint}
                    endPoint={endPoint}
                    gridMap={gridBoardCells.current}
                    visualizeAlgo={visualizeAlgo}
                    roomId={roomId}
                    playersData={players}
                    generateRandomMaze={generateRandomMaze}
                    handleGenerateMaze={handleGenerateMaze}
                ></Players>
            </div>
        </>
    );
}
