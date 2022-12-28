enum GridShape {
  Rows = 0,
  Columns = 0
}

export enum AppState {
  Start,
  End,
  Open // blocking time
}

export enum CellType {
  Start,
  End,
  Open,
  Passed,
  Blocked
}

export type OnCellClick = (cell: CellStatus) => void;

export interface GridForm {
  rows: GridShape.Rows;
  columns: GridShape.Columns;
}
// export interface GridCells {
//   cells: Array<CellStatus>;
// }
export interface CellStatus {
  x: number | null,
  y: number | null,
  type: CellType,
  index: number, // location in main array
  boundaryLeft: boolean,
  boundaryRight: boolean,
  boundaryTop: boolean,
  boundaryBottom: boolean,
}
