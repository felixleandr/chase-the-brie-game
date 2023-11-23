import React, { HTMLAttributes, useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { getCellObjects, getPath } from "../utils/helpers";
import iconsMouse from '../assets/icons8-mouse-toy-64.png'
import iconsCheese from '../assets/icons8-cheese-64.png'
import { incrementWins } from "../store/actionCreator";
import { useDispatch } from "react-redux";
import socket from "../config";

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
  useEffect(() => {
    socket.on("changePosition", (payload) => {
      console.log(payload, "<<<socekt");
    });
  }, []);

  let [playerPathCount, setCount] = useState(null)
  const gridBoardCells = useRef(getCellObjects());

  let newPosition = { ...startPointPosition };
  
  return (
    <>
     <div
      {...props}
      className={`cell lg:w-6 w-4 lg:h-6 h-4 inline-flex justify-center items-center aspect-square border-[0.1px] border-violet-800${
        isStartPoint ? (
          // <img width="64" height="64" src="https://img.icons8.com/external-yogi-aprelliyanto-outline-color-yogi-aprelliyanto/32/000000/external-mouse-toy-pet-shop-yogi-aprelliyanto-outline-color-yogi-aprelliyanto.png" alt="external-mouse-toy-pet-shop-yogi-aprelliyanto-outline-color-yogi-aprelliyanto"/>
          ""
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
        // <img className="w-7 h-7" src={iconsMouse} alt="external-mouse-toy-pet-shop-photo3ideastudio-gradient-photo3ideastudio"/>
        ""
      ) : isEndPoint ? (
        <img className="w-5 h-5" src={iconsCheese} alt="cheese--v2"/>
      ) : null}
    </div>
    </>
   
  );
}
