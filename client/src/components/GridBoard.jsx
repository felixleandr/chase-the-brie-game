import React, { useEffect, useRef, useState } from "react";
import { getCellObjects, getPath } from "../utils/helpers";
import { BFS, generateRandomMaze } from "../app/index";
import Cell from "./Cell";

export default function GridBoard() {
  const gridBoardCells = useRef(getCellObjects());
  const [startPoint, setStartPoint] = useState(null);
  // state bentuk array isinya player 1 & 2
  // menerima state isMultiplayer
  const [endPoint, setEndPoint] = useState(null);
  const [renderFlag, setRenderFlag] = useState(false);
  const [foundPath, setFoundPath] = useState(null);
  const [gridMap, setGridMap] = useState(null)
  const [pathCount, setPathCount] = useState(null)

  const [cellsScanned, setCellsScanned] = useState(0);
  const [cellsTraveled, setCellsTraveled] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);


  const clearBoard = () => {
    gridBoardCells.current = getCellObjects(true, true, gridBoardCells.current);
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
        let item = document.getElementById(`cell-${cell.row}-${cell.col}`);
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
        let item = document.getElementById(`cell-${cell.row}-${cell.col}`);
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
    return path
  }

  const visualizeAlgo = () => {
    grid = gridBoardCells.current;
    // console.log(grid, 'grid');
    // grid.find((cell) => console.log(cell, 'start'))
    // const startPoint = grid.find(({isStartPoint}) => {
    //   isStartPoint === true
    // }); // harus mencari start point dan endpoint dari array grid
    // const endPoint = grid.find(({isEndPoint}) => isEndPoint === true);
    let start = grid[startPoint.row][startPoint.col];
    let end = grid[endPoint.row][endPoint.col];
    let visitedCells = [];
    
    let [BFSCells, BFSTime] = BFS(grid, start, end) || [];
    // let a = BFS(grid, start, end) || [];
    visitedCells = BFSCells || [];

    setTimeTaken(BFSTime || 0);

    const path = getPath(end);
    console.log(path, 'padang');
    // console.log(visitedCells, path, 'inii visitedcells');
    setCellsScanned(visitedCells.length);
    animateAlgo(visitedCells, path);
    return path
  };

  const handleGenerateMaze = () => {
    setRenderFlag(!renderFlag);
    clearBoard(); // just to be sure that board and path is cleared
    const startAndEndPoint = generateRandomMaze(gridBoardCells.current);

    setStartPoint(startAndEndPoint.startCell)
    setEndPoint(startAndEndPoint.endCell)
    setGridMap(gridBoardCells.current)

  }

  useEffect(() => {
    if (foundPath && startPoint && endPoint) {
      animatePath(foundPath);
    }
  }, [foundPath]);

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
          <button
            onClick={() => visualizeAlgo()}
            className="items-center w-fit disabled:bg-indigo-400 disabled:cursor-not-allowed inline-flex bg-lime-300 text-[15px] text-indigo-800 px-4 py-2 rounded-md"
          >
            Give Up
          </button>
        </div>
      </div>
      <div className="grid grid-cols-gridmap overflow-auto w-full px-4 justify-start md:justify-center items-center my-3">
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
                    pathCount = {pathCount}
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
      </div>
    </>
  );
}
