export enum AppState {
  Start = "Start",
  End = "End",
  Open = "Open" // blocking time
}

export enum CellType {
  Start = "Start",
  End = "End",
  Open = "Open",
  Passed = "Passed",
  Blocked = "Blocked"
}

export type OnCellClick = (cell: CellStatus) => void;

export interface GridForm {
  rows: number,
  columns: number,
}
// export interface GridCells {
//   cells: Array<CellStatus>;
// }

export type CellIndex = number;
export interface CellStatus {
  x: number | null,
  y: number | null,
  type: CellType,
  index: CellIndex, // location in main array
  boundaryLeft: boolean,
  boundaryRight: boolean,
  boundaryTop: boolean,
  boundaryBottom: boolean,
}

export type CellGrid = Array<Array<CellStatus>>;

// Pathfinder Types

export type PathOfCellIndexes = Array<CellIndex | PathSearchResult>;
export type PathsThroughMatrix = Array<PathOfCellIndexes>;
export type MatrixGrid = Array<Array<MatrixCell>>;

export interface MatrixCell {
  cellIndex: CellIndex,
  type: CellType
}

export interface QueueCell extends MatrixCell {
  y: number,
  x: number,
  path: PathOfCellIndexes
}

export enum PathSearchResult {
  Reached = "Reached",
  Blocked = "Blocked",
  Passed = "Passed"
}

