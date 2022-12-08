import styled, { keyframes } from "styled-components";
import {useState , useEffect} from "react";

// interface 는 object의 shape를 설명해줌
interface ContainerProps {
    bgColor: string;
    borderColor: string;
}

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border: 1px solid ${(props) => props.borderColor};
    border-radius: 50%;
`;

interface CircleProps {
    bgColor: string;
    // ? 이걸 붙히면 optional props
    borderColor?: string;
    text?: string;
}

function Circle ({ bgColor, borderColor, text="default text" } : CircleProps) {
    const [counter, setCounter] = useState<number | string>(0);
    return (
        <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
            {text}
        </Container>
    );
    // borderColor값이 없으면 bgColor를 출력
}

export default Circle;