

export const CellInterface = {
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

// SearchingAlgoEnum definition
export const SearchingAlgoEnum = {
  DIJKSTRA: "DIJKSTRA",
  BFS: "BFS",
  DFS: "DFS",
};

// AlgorithmOption definition
export function AlgorithmOption(name, type, onClick) {
  this.name = name;
  this.type = type;
  this.onClick = onClick;
}

// Exporting definitions
