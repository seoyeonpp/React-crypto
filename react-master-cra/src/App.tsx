import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const rotateAni = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50%{
    transform: rotate(360deg);
    border-radius: 50%;
  }
  100% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const Emoji = styled.span`
  font-size: 36px;

`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height:100px;
  width:100px;
  background-color: yellowgreen;
  animation: ${rotateAni} 2s linear infinite;
  ${Emoji}{
    &:hover {
      font-size: 98px;
    }
  }
`;



function App() {
  return (
    <Wrapper>
      <Title>Hello~~~</Title>
      <Box>
        <Emoji as="p">😎</Emoji>
      </Box>
    </Wrapper>
  );
}

export default App;