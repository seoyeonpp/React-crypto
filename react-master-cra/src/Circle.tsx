import exp from 'constants';
import styled, { keyframes } from "styled-components";

// interface 는 object의 shape를 설명해줌
interface ContainerProps {
    bgColor: string;
}

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor}

`;

interface CircleProps {
    bgColor: string;
}

function Circle ({ bgColor } : CircleProps) {
    return <Container bgColor={bgColor} />;
}

export default Circle;