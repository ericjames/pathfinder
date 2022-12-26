import './App.css';

import React from 'react';
import logo from './logo.svg';
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
  return (
    <AppWrapper>
      <Header>
        <h1>Pathfinder</h1>
      </Header>
      <Content>


      </Content>
    </AppWrapper>
  );
}

export default App;
