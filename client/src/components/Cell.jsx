import React, { HTMLAttributes, useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { getCellObjects, getPath } from "../utils/helpers";
import iconsMouse from '../assets/icons8-mouse-toy-64.png'
import iconsCheese from '../assets/icons8-cheese-64.png'
import { incrementWins } from "../store/actionCreator";
import { useDispatch } from "react-redux";

export default function Cell({
  isStartPoint,
  isEndPoint,
  isWall,
  cellNumber,
  col,
  isVisited,
  row,
  previousCell,
  distanceFromStart,
  isTarget,
  pathCount,
  startPoint,
  endPoint,
  map,
  visualizeAlgo,
  getDistance,
  ...props
}) {
  const [startPointPosition, setStartPointPosition] = useState({
    row,
    col,
  });

  let [playerPathCount, setCount] = useState(null)
  const gridBoardCells = useRef(getCellObjects());

  let newPosition = { ...startPointPosition };

  const dispatch = useDispatch()

  const incrementUserWin = async () => {
    try {
      await dispatch(incrementUserWin({gameType: 'singlePlayerWin'}))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // console.log(pathCount, 'iniii');
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  },);

  const handleKeyPress = (event) => {
    if (isStartPoint) {
      setStartPointPosition({
        row,
        col
      })
      newPosition = { ...startPointPosition };
      let currentPosition = {...startPointPosition}
      switch (event.key) {
        case "ArrowLeft":
          newPosition.col -= 1
          setCount(playerPathCount + 1);
          break;
        case "ArrowRight":
          newPosition.col += 1
          setCount( playerPathCount + 1);

          break;
        case "ArrowUp":
          newPosition.row -= 1
          setCount( playerPathCount + 1);

          break;
        case "ArrowDown":
          newPosition.row += 1
          setCount( playerPathCount + 1);

          break;
        default:
          return;
      }
      if (isTargetAtPosition(newPosition.row, newPosition.col)){
        let path = visualizeAlgo()
        console.log(path.length, 'papapapa');
        console.log(playerPathCount, 'pasangan papapapa');
        if(playerPathCount <= path.length){
          // useDispatch(incrementWins({gameType: 'singlePlayerWin'})) 
          incrementUserWin()
          Swal.fire({
            title: "Congrats ! You Win !",
            width: 500,
            padding: "3em",
            color: "#716add",
            backdrop: `
              rgba linear-gradient(4deg, rgba(25,72,98,1) 0%, rgba(0,0,0,1) 50%);
              left top
              no-repeat
            `
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
            `
          });
        }
      }
      if (!isWallAtPosition(newPosition.row, newPosition.col)) {
        setStartPointPosition(newPosition);
      } else {
        setStartPointPosition(currentPosition)
      }
  };
}
  const isTargetAtPosition = (row, col) => {
    const cell = map[row][col];
    const isEndPoint = cell.isEndPoint;
    return isEndPoint
  };
  const isWallAtPosition = (row, col) => {
    // console.log(map);
    const cell = map[row][col];
    
    const isWall = cell.isWall;
    return isWall
  };

  return (
    <>
     <div
      {...props}
      className={`cell lg:w-6 w-4 lg:h-6 h-4 inline-flex justify-center items-center aspect-square border-[0.1px] border-violet-800${
        isStartPoint ? (
          <img width="64" height="64" src="https://img.icons8.com/external-yogi-aprelliyanto-outline-color-yogi-aprelliyanto/32/000000/external-mouse-toy-pet-shop-yogi-aprelliyanto-outline-color-yogi-aprelliyanto.png" alt="external-mouse-toy-pet-shop-yogi-aprelliyanto-outline-color-yogi-aprelliyanto"/>
        ) : ""
      } ${isEndPoint ? (
        <img width="64" height="64" src="https://img.icons8.com/cotton/64/000000/cheese--v2.png" alt="cheese--v2"/>
      ) : null} ${
        isWall ? "!bg-violet-700 wall-animate" : ""
      }`}
      style={{
        gridColumn: startPointPosition.col + 1,
        gridRow: startPointPosition.row + 1,
      }}
    >
      {isStartPoint ? (
        <img className="w-7 h-7" src={iconsMouse} alt="external-mouse-toy-pet-shop-photo3ideastudio-gradient-photo3ideastudio"/>
      ) : isEndPoint ? (
        <img className="w-6 h-6" src={iconsCheese} alt="cheese--v2"/>
      ) : null}
    </div>
    </>
   
  );
}
