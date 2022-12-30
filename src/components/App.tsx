import { AppState, CellGrid, CellStatus, CellType, GridForm } from './types';
import { useEffect, useState } from 'react';

import Grid from './Grid';
import { getReachablePaths } from './Pathfinder';
import styled from 'styled-components';

const AppWrapper = styled.div`
max-width: 1400px;
padding: 20px;
background: #fff;
min-height: 80vh;
margin: auto;

`;

const Header = styled.header`

`;

const Content = styled.main`
`;

function App() {

  const [appState, setAppState] = useState<AppState>(AppState.Start);

  // User can change grid width height
  const [gridForm, setGridForm] = useState<GridForm>({ rows: 3, columns: 3 });

  // Holy grail tracks number of cells and their X or O status
  // Single source of data used to render the grid via CSS
  const [cells, setCells] = useState<Array<CellStatus>>([]);

  // Cell Grid form of cells is only used for path traversal 
  const [cellGrid, setCellGrid] = useState<CellGrid>([]);

  // @TODO Path draw
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    // @Debugging only
    createCells();
  }, [gridForm]);

  const createCells = () => {
    // Reset app
    setAppState(AppState.Start);

    if (gridForm.rows && gridForm.columns) {
      const cellCount = gridForm.rows * gridForm.columns;

      // Create our main tracking array of cells
      const newCells = [];
      for (let i = 0; i < cellCount; i++) {
        newCells.push({ index: i, type: CellType.Open } as CellStatus);
      }

      // Give coordinates and boundaries for each cell
      // Avoiding needing to do these loops later, use CSS to do the visual trickery
      let counter = 0;
      const rows = [];
      for (let y = 0; y < gridForm.rows; y++) {
        rows.push([] as Array<CellStatus>);
        const row = rows[y];
        for (let x = 0; x < gridForm.columns; x++) {
          newCells[counter].y = y;
          newCells[counter].x = x;
          newCells[counter].boundaryLeft = (x === 0);
          newCells[counter].boundaryRight = (x === gridForm.columns - 1);
          newCells[counter].boundaryTop = (y === 0);
          newCells[counter].boundaryBottom = (y === gridForm.rows - 1);
          row.push(newCells[counter]);
          counter = counter + 1;
        }
      }

      setCells(newCells);
      setCellGrid(rows);
    } else {
      alert("Please provide positive numbers for rows and columns");
    }
  }

  const onCellClick = (cell: CellStatus) => {

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
    setPath();
  }

  const setCellBlocked = (cell: CellStatus) => {
    const newCells = [...cells];
    newCells[cell.index].type = newCells[cell.index].type !== CellType.Blocked ? CellType.Blocked : CellType.Open;
    setCells(newCells);
  }

  const setPath = () => {

    // Find all paths to the target
    const paths = getReachablePaths(cellGrid);
    console.log("YES", paths);

    // for (let i = 0; i < rows.length; i++) {

    // }


  }




  return (
    <AppWrapper>
      <Header>
        <h1>Pathfinder</h1>
      </Header>
      <Content>

        <input value={gridForm.rows} onChange={(e) => { setGridForm({ ...gridForm, rows: parseFloat(e.target.value) }) }} type="number" />
        <input value={gridForm.columns} onChange={(e) => { setGridForm({ ...gridForm, columns: parseFloat(e.target.value) }) }} type="number" />
        <button onClick={createCells}>Set Grid</button>

        <Grid gridForm={gridForm} cells={cells} onCellClick={onCellClick} />

        <br /><br /><br /><br />
        Debug:<br /><br />
        gridForm: {JSON.stringify(gridForm)}


      </Content>
    </AppWrapper>
  );
}

export default App;
