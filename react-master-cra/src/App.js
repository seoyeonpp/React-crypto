import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

// Box의 속성을 그대로 가져옴
const Circle = styled(Box)`
  border-radius:50%;
`;


function App() {
  return (
    <Father>
      <Box bgColor="teal"/>
      <Circle bgColor="tomato"/>
    </Father>
  );
}

export default App;