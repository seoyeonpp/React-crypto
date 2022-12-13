import { useLocation, useParams } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import styled from 'styled-components';


const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Title = styled.h1`
    color : ${(props) => props.theme.accentColor};
`;
const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Loader = styled.span`
    display: block;
    text-align: center; 
`;


interface RouteParams {
    coinId : string;
}
interface RouteState {
    name: string;
}


function Coin() {
    const [loading, setLoaing] = useState(true);
    const {coinId} = useParams<RouteParams>();
    const {state} = useLocation<RouteState>();
    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState({});
    useEffect(() => {
        (async() => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
            setInfo(infoData);
            setPriceInfo(priceData);
            console.log(priceInfo)
        })();
    }, [])
    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading"}</Title>
            </Header>
            {loading ? 
                <Loader>Loading...</Loader> : null
            }
        </Container>
    )
}

export default Coin;