import Grid from './Grid';
import GridType from './types';
import styled from 'styled-components';
import { useState } from 'react';

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

  const [grid, setGrid] = useState<GridType | null>(null);

  return (
    <AppWrapper>
      <Header>
        <h1>Pathfinder</h1>
      </Header>
      <Content>
        <Grid grid={grid} />


      </Content>
    </AppWrapper>
  );
}

export default App;
