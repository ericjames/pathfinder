import { CellStatus, GridForm } from './types';
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

  // User can change grid width height
  const [gridForm, setGridForm] = useState<GridForm>({ rows: 3, columns: 3 });
  // const [rows, setRows] = useState<number>(0);
  // const [columns, setColumns] = useState<number>(0);

  // Tracks number of cells and their X or O status
  const [cells, setCells] = useState<Array<Array<CellStatus>>>([]);

  useEffect(() => {
    // @Debugging only
    createCells();
  }, [gridForm]);

  const createCells = () => {
    if (gridForm.rows && gridForm.columns) {
      // const cellCount = gridForm.rows * gridForm.columns;
      const newCellGrid = [];
      // Arrange for BFS search ...[row: column cells] 
      for (let i = 0; i < gridForm.rows; i++) {
        newCellGrid.push([] as Array<CellStatus>);
        const row = newCellGrid[i];
        for (let j = 0; j < gridForm.columns; j++) {
          row.push({ marked: 0, traversed: 0 } as CellStatus);
        }
      }
      setCells(newCellGrid);
    }
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

        <Grid gridForm={gridForm} cells={cells} />


        <br /><br /><br /><br />
        Debug:<br /><br />
        gridForm: {JSON.stringify(gridForm)}


      </Content>
    </AppWrapper >
  );
}

export default App;
