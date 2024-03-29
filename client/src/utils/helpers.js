import { CellInterface } from "../interfaces";

export const singleCell = {
  cellNumber: 0,
  col: 0,
  row: 0,
  isVisited: false,
  isWall: false,
  isStartPoint: false,
  isEndPoint: false,
  distanceFromStart: Infinity,
  previousCell: null,
  isTarget: false,
};

// getCellObjects function
export const getCellObjects = (
  resetOnlyPath = false,
  resetOnlyWalls = false,
  grid
) => {
  let gridCells = grid || [];
  let cellNumber = 0;

  for (let rowInd = 0; rowInd < 20; rowInd++) {
    let currentRow = [];

    for (let colInd = 0; colInd < 40; colInd++) {
      if ((resetOnlyPath || resetOnlyWalls) && grid) {
        // don't recreate the grid instead just reset the path and walls flag conditionally
        grid[rowInd][colInd].isVisited = false;
        grid[rowInd][colInd].distanceFromStart = Infinity;
        grid[rowInd][colInd].isTarget = false;
        grid[rowInd][colInd].isStartPoint = false;
        grid[rowInd][colInd].isEndPoint = false;
        grid[rowInd][colInd].previousCell = null;

        if (resetOnlyWalls) {
          grid[rowInd][colInd].isWall = false;
        }
      } else {
        currentRow.push({
          ...singleCell,
          row: rowInd,
          col: colInd,
          cellNumber: cellNumber,
        });
      }

      cellNumber++;
    }

    if (!resetOnlyPath) {
      gridCells.push(currentRow);
    }
  }

  return gridCells;
};

// Exporting definitions

export function getCells(grid) {
  let cellsArray = [];
  grid.forEach((row) => {
    row.forEach((cell) => {
      cellsArray.push(cell);
    });
  });
  return cellsArray;
}

export function getPath(endPoint) {
  let path = getShortestPathCells(endPoint) || [];
  return path;
}

export function getShortestPathCells(endCell) {
  const pathCells = [];
  console.log(endCell, 'endcell');
  let currentCell = endCell;

  if(endCell) {
    while (currentCell && pathCells.length < 214748364 ) {
      // console.log(pathCells.length, '<<<<');
      pathCells.push(currentCell);
      currentCell = currentCell.previousCell;
    }
  }
  console.log(pathCells.length, "path cells length");
  return pathCells;
}
