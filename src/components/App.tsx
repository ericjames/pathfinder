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
  const [gridForm, setGridForm] = useState<GridForm>({ rows: 0, columns: 0 });
  // const [rows, setRows] = useState<number>(0);
  // const [columns, setColumns] = useState<number>(0);

  // Tracks number of cells and their X or O status
  const [cells, setCells] = useState<Array<CellStatus>>([]);

  useEffect(() => {
    if (gridForm.rows && gridForm.columns) {
      const cellCount = gridForm.rows * gridForm.columns;
      const newCellGrid = [] as Array<CellStatus>;
      for (let i = 0; i < cellCount; i++) {
        newCellGrid.push({} as CellStatus);
      }
      setCells(newCellGrid);
    }
  }, [gridForm]);


  return (
    <AppWrapper>
      <Header>
        <h1>Pathfinder</h1>
      </Header>
      <Content>

        <input value={gridForm.rows} onChange={(e) => { setGridForm({ ...gridForm, rows: parseFloat(e.target.value) }) }} type="number" />
        <input value={gridForm.columns} type="number" />

        <Grid gridForm={gridForm} cells={cells} />


        <br /><br /><br /><br />
        Debug:<br /><br />
        gridForm: {JSON.stringify(gridForm)}


      </Content>
    </AppWrapper >
  );
}

export default App;
