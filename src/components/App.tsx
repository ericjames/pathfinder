import { AppState, CellStatus, CellType, GridForm } from './types';
import { useEffect, useState } from 'react';

import Grid from './Grid';
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
  // const [rows, setRows] = useState<number>(0);
  // const [columns, setColumns] = useState<number>(0);

  // Holy grail tracks number of cells and their X or O status
  const [cells, setCells] = useState<Array<CellStatus>>([]);

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
      const newCellGrid = [];
      for (let i = 0; i < cellCount; i++) {
        newCellGrid.push({ index: i, type: CellType.Open } as CellStatus);
      }

      // Give coordinates and boundaries for each cell
      // Avoiding needing to do these loops later, use CSS to do the visual trickery
      let counter = 0;
      for (let y = 0; y < gridForm.rows; y++) {
        for (let x = 0; x < gridForm.columns; x++) {
          newCellGrid[counter].y = y;
          newCellGrid[counter].x = x;
          newCellGrid[counter].boundaryLeft = (x === 0);
          newCellGrid[counter].boundaryRight = (x === gridForm.columns - 1);
          newCellGrid[counter].boundaryTop = (y === 0);
          newCellGrid[counter].boundaryBottom = (y === gridForm.rows - 1);
          counter = counter + 1;
        }
      }

      setCells(newCellGrid);
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
    let newCellGrid = cells;
    newCellGrid[cell.index].type = CellType.Start;
    setCells([...newCellGrid]);
  }

  const setCellEnd = (cell: CellStatus) => {
    let newCellGrid = cells;
    newCellGrid[cell.index].type = CellType.End;
    setCells([...newCellGrid]);
  }

  const setCellBlocked = (cell: CellStatus) => {
    let newCellGrid = cells;
    newCellGrid[cell.index].type = newCellGrid[cell.index].type !== CellType.Blocked ? CellType.Blocked : CellType.Open;
    setCells([...newCellGrid]);
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
