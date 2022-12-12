// import styled, { keyframes } from "styled-components";
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function App() {

  return (
    <Container>
      <H1>HI~~~~</H1>
    </Container>
  );
}

export default App;