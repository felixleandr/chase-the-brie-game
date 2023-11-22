// Visit your neighbors
export function BFS(grid, startCell, endCell) {
  let startTime = Date.now();
  let endTime;
  // console.log(grid, startCell, endCell, 'bfs');
  let unvisitedCellsQueue = [startCell];
  let visitedCells = [];

  startCell.isVisited = true;

  while (unvisitedCellsQueue.length > 0) {
    let currentCell = unvisitedCellsQueue.pop(); // for BFS we want neighbors to get traversed first so we pop() the item which we put first
    // console.log(currentCell, 'current cell');

    if (!currentCell) {
      endTime = Date.now();
      return [visitedCells, endTime - startTime];
    }

    const { col, row, cellNumber, isVisited } = currentCell;

    if (cellNumber !== startCell.cellNumber && isVisited) continue; // we don't need to operate on start cell

    visitedCells.push(currentCell);
    // console.log(visitedCells, 'visited celll');
    
    if (cellNumber === endCell.cellNumber) {
      currentCell.isTarget = true;
      endTime = Date.now();
      // console.log(visitedCells, 'visited celll 2');
      return [visitedCells, endTime - startTime];
    }

    if (
      col + 1 < grid[0].length &&
      !grid[row][col + 1].isWall &&
      !grid[row][col + 1].isVisited
    ) {
      grid[row][col + 1].previousCell = currentCell;
      unvisitedCellsQueue.unshift(grid[row][col + 1]);
      // currentCell.isVisited = true;
    }

    if (
      row - 1 >= 0 &&
      !grid[row - 1][col].isWall &&
      !grid[row - 1][col].isVisited
    ) {
      grid[row - 1][col].previousCell = currentCell;
      unvisitedCellsQueue.unshift(grid[row - 1][col]);
      currentCell.isVisited = true;
    }``

    if (
      row + 1 < grid.length &&
      !grid[row + 1][col].isWall &&
      !grid[row + 1][col].isVisited
    ) {
      grid[row + 1][col].previousCell = currentCell;
      unvisitedCellsQueue.unshift(grid[row + 1][col]);
      currentCell.isVisited = true;
    }

    if (
      col - 1 >= 0 &&
      !grid[row][col - 1].isWall &&
      !grid[row][col - 1].isVisited
    ) {
      grid[row][col - 1].previousCell = currentCell;
      unvisitedCellsQueue.unshift(grid[row][col - 1]);
      currentCell.isVisited = true;
    }
  }
  endTime = Date.now();
  // console.log(visitedCells, 'last');
  return [visitedCells, endTime - startTime];
}
