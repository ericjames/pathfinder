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
height: 80vh;
box-shadow: 0 1em 3em #eee inset;
`

const Header = styled.header`
text-align: center;
`;

const Content = styled.main`
`;


const Notice = styled.div`
text-align: center;
width: 100%;
text-align: center;
color: #555;
margin: 1em;
`;

const Controls = styled.div`
  margin-bottom: 1em;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  > * {
    flex: 0 1 auto; 
    text-align: center;
    margin-bottom: 1em;
  }
`;


function App() {

  const [appState, setAppState] = useState<AppState>(AppState.Setup);

  // User can change grid width height
  const [gridForm, setGridForm] = useState<GridForm | null>(null);
  const [rows, setRows] = useState<number>(0);
  const [columns, setColumns] = useState<number>(0);

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

  const resetApp = () => {
    // Reset app
    setAppState(AppState.Setup);
    setRows(0);
    setColumns(0);
    setCells([]);
    setCellGrid([]);
    setPaths([]);
    setGridForm(null);
  }

  const resetPaths = () => {
    setPaths([]);
  }

  const createCellGrid = () => {

    if (!rows || !columns) {
      return alert("Please provide positive numbers for rows and columns");
    }

    if (rows > 100 || columns > 100) {
      return alert("Please provide 100 or less rows or columns");
    }

    const cellCount = rows * columns;

    // Create our main tracking array of cells
    const newCells = [];
    for (let i = 0; i < cellCount; i++) {
      newCells.push({ index: i, type: CellType.Open } as CellStatus);
    }

    // Give coordinates and boundaries for each cell
    // Avoiding needing to do these loops later, use CSS to do the visual trickery
    let cellIndex = 0;
    const newRows = [];
    for (let y = 0; y < rows; y++) {
      newRows.push([] as Array<CellStatus>);
      const row = newRows[y];
      for (let x = 0; x < columns; x++) {
        newCells[cellIndex].y = y;
        newCells[cellIndex].x = x;
        newCells[cellIndex].boundaryLeft = (x === 0);
        newCells[cellIndex].boundaryRight = (x === columns - 1);
        newCells[cellIndex].boundaryTop = (y === 0);
        newCells[cellIndex].boundaryBottom = (y === rows - 1);
        row.push(newCells[cellIndex]);
        cellIndex = cellIndex + 1;
      }
    }

    // console.log("what is grid", rows, gridForm);

    setGridForm({ rows, columns } as GridForm);
    setCells(newCells);
    setCellGrid(newRows);
    setAppState(AppState.Start);

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
    // console.log("Cells are", cells);
    // console.log("Reachable", paths);

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
          <div style={{ display: !gridForm ? 'block' : 'none' }}>
            Width: <input min="1" max="100" step="1" value={columns} onChange={(e) => { setColumns(parseFloat(e.target.value)) }} type="number" />
            Height: <input min="1" max="100" step="1" value={rows} onChange={(e) => { setRows(parseFloat(e.target.value)) }} type="number" />
            <button onClick={createCellGrid}>Create Grid</button>
          </div>
          {gridForm && appState === AppState.Open ? <button onClick={resetApp}>Start over</button> : null}
          {gridForm && appState === AppState.Open && paths.length === 0 ? <button style={{ marginLeft: 50, minWidth: 300, backgroundColor: appState === AppState.Open ? 'lightblue' : '' }} onClick={determinePaths}>Find Path</button> : null}
          {gridForm && appState === AppState.Open && paths.length > 0 ? <button style={{ marginLeft: 50, minWidth: 300, backgroundColor: appState === AppState.Open ? 'lightyellow' : '' }} onClick={resetPaths}>Reset Paths</button> : null}
        </Controls>

        <>
          {!gridForm ? <Notice>Enter a width and height to create a grid below...</Notice> : null}
          {appState === AppState.Start ? <Notice>Select a starting block...</Notice> : null}
          {appState === AppState.End ? <Notice>Select an ending block...</Notice> : null}
          {appState === AppState.Open && !paths.length ? <Notice>You may "block" any block and Find a Path</Notice> : null}
          {appState === AppState.Open && paths.length > 0 ? <Notice>Paths found!</Notice> : null}
        </>

        <GridArea>
          <InteractiveGrid gridForm={gridForm} cells={cells} selectCellAndChangeAppState={selectCellAndChangeAppState} />
          <Paths gridForm={gridForm} cells={cells} cellGrid={cellGrid} paths={paths} />
        </GridArea>

      </Content>
    </AppWrapper>
  );
}

export default App;
