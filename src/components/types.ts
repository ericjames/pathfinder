enum GridShape {
  Rows = 0,
  Columns = 0
}

enum CellMarking {
  Marked = 0,
  Traversed = 0
}


export interface GridForm {
  rows: GridShape.Rows;
  columns: GridShape.Columns;
}
// export interface GridCells {
//   cells: Array<CellStatus>;
// }
export interface CellStatus {
  marked: CellMarking.Marked,
  traversed: CellMarking.Traversed
}
