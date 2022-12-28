enum GridShape {
  Rows = 0,
  Columns = 0
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
  index: number, // location in main array
  boundaryLeft: boolean,
  boundaryRight: boolean,
  boundaryTop: boolean,
  boundaryBottom: boolean,
  blocked: boolean,
  traversed: boolean
}
