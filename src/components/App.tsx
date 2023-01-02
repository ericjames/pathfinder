import { AppState, CellGrid, CellIndex, CellStatus, CellType, GridForm, PathsThroughMatrix } from './types';
import { useEffect, useState } from 'react';

import InteractiveGrid from './InteractiveGrid';
import Paths from './Paths';
import { getReachablePaths } from './Pathfinder';
import styled from 'styled-components';

const AppWrapper = styled.div`
max-width: 1400px;
padding: 20px;
background: #fff;
margin: auto;

`;

const GridArea = styled.div`
position: relative;
height: 500px;
`

const Header = styled.header`

`;

const Content = styled.main`
`;

const Controls = styled.div`
  margin-bottom: 1em;
`;


function App() {

  const [appState, setAppState] = useState<AppState>(AppState.Start);

  // User can change grid width height
  const [gridForm, setGridForm] = useState<GridForm>({ rows: 0, columns: 0 });

  // Holy grail tracks number of cells and their X or O status
  // Single source of data used to render the grid via CSS
  const [cells, setCells] = useState<Array<CellStatus>>([]);

  // Cell Grid form of cells is only used for path traversal 
  const [cellGrid, setCellGrid] = useState<CellGrid>([]);
  const [paths, setPaths] = useState<PathsThroughMatrix>([]);

  // useEffect(() => {
  //   // @Debugging only
  //   createCellGrid();
  // }, [gridForm]);

  const createCellGrid = () => {
    // Reset app
    setAppState(AppState.Start);
    setCells([]);
    setCellGrid([]);
    setPaths([]);

    if (!gridForm.rows || !gridForm.columns) {
      return alert("Please provide positive numbers for rows and columns");
    }

    const cellCount = gridForm.rows * gridForm.columns;

    // Create our main tracking array of cells
    const newCells = [];
    for (let i = 0; i < cellCount; i++) {
      newCells.push({ index: i, type: CellType.Open } as CellStatus);
    }

    // Give coordinates and boundaries for each cell
    // Avoiding needing to do these loops later, use CSS to do the visual trickery
    let cellIndex = 0;
    const rows = [];
    for (let y = 0; y < gridForm.rows; y++) {
      rows.push([] as Array<CellStatus>);
      const row = rows[y];
      for (let x = 0; x < gridForm.columns; x++) {
        newCells[cellIndex].y = y;
        newCells[cellIndex].x = x;
        newCells[cellIndex].boundaryLeft = (x === 0);
        newCells[cellIndex].boundaryRight = (x === gridForm.columns - 1);
        newCells[cellIndex].boundaryTop = (y === 0);
        newCells[cellIndex].boundaryBottom = (y === gridForm.rows - 1);
        row.push(newCells[cellIndex]);
        cellIndex = cellIndex + 1;
      }
    }

    console.log("what is grid", rows, gridForm);

    setCells(newCells);
    setCellGrid(rows);

  }

  const selectCellAndChangeAppState = (cell: CellStatus) => {

    if (appState === AppState.Start) {
      setCellStart(cell);
      setAppState(AppState.End);
    } else if (appState === AppState.End) {
      setCellEnd(cell);
      setAppState(AppState.Open);
    } else if (cell.type !== CellType.Start && cell.type !== CellType.End) { // Dont know why this shouldnt be a ||
      setCellBlocked(cell);
    }
  }

  const setCellStart = (cell: CellStatus) => {
    const newCells = [...cells];
    newCells[cell.index].type = CellType.Start;
    setCells(newCells);
  }

  const setCellEnd = (cell: CellStatus) => {
    const newCells = [...cells];
    newCells[cell.index].type = CellType.End;
    setCells(newCells);
  }

  const setCellBlocked = (cell: CellStatus) => {
    const newCells = [...cells];
    newCells[cell.index].type = newCells[cell.index].type !== CellType.Blocked ? CellType.Blocked : CellType.Open;
    setCells(newCells);
  }

  const determinePaths = () => {

    if (appState === AppState.Start) {
      return alert("Pick a starting cell");
    }
    if (appState === AppState.End) {
      return alert("Pick a ending cell");
    }

    // Find all paths to the target
    const paths = getReachablePaths(cellGrid);
    console.log("Cells are", cells);
    console.log("Reachable", paths);

    if (paths && paths.length > 0) {
      setPaths(paths);
    } else {
      alert("No paths found :(");
    }
  }

  return (
    <AppWrapper>
      <Header>
        <h1>Pathfinder</h1>
      </Header>
      <Content>

        <Controls>
          Width: <input min="1" max="100" value={gridForm.columns} onChange={(e) => { setGridForm({ ...gridForm, columns: parseFloat(e.target.value) }) }} type="number" />
          Height: <input min="1" max="100" value={gridForm.rows} onChange={(e) => { setGridForm({ ...gridForm, rows: parseFloat(e.target.value) }) }} type="number" />
          <button onClick={createCellGrid}>Set Grid</button>

          {cells.length > 0 && <button style={{ float: 'right' }} onClick={determinePaths}>Find Path</button>}
        </Controls>

        <GridArea>
          <InteractiveGrid gridForm={gridForm} cells={cells} selectCellAndChangeAppState={selectCellAndChangeAppState} />
          <Paths gridForm={gridForm} cells={cells} cellGrid={cellGrid} paths={paths} />
        </GridArea>

      </Content>
    </AppWrapper>
  );
}

export default App;
