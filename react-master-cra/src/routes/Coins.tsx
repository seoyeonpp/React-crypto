import { Link } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';

const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
    background-color: #333;
    color : ${(props) => props.theme.textColor};
    margin-bottom: 10px;
    border-radius: 10px;
    a{
        display: flex;
        align-items: center;
        gap: 10px;
        transition : color 0.2s ease-in;
        padding: 20px;
    }
    &:hover {
        a{
            color: ${(props) => props.theme.accentColor};
        }
    }
`;
const Title = styled.h1`
    color : ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
    display: block;
    text-align: center; 
`;

const Img = styled.img`
    width: 25px;
    height: 25px; 
    display:inline-block;
`;

interface CoinInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

function Coins() {
    const {isLoading, data} =  useQuery<CoinInterface[]>("allCoins",fetchCoins)
    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoaing] = useState(true);
    // useEffect(() => {
    //     (async() => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setCoins(json.slice(0,100));
    //         setLoaing(false);
    //     })();
    // },[]);
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {isLoading ? 
                <Loader>Loading...</Loader> : (
                    <CoinsList>
                        {data?.slice(0,100).map((coin) => (
                            <Coin key={coin.id}>
                                <Link to={{
                                    pathname: `/${coin.id}`,
                                    state: {name: coin.name }
                                }}>
                                    <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                                    {coin.name} &rarr;
                                </Link>
                            </Coin>
                        ))}
                    </CoinsList>
                )
            }
        </Container>
    );
}

export default Coins;