import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet';

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
    font-size: 36px;
    font-weight: 700;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
    background-color: rgba(255,255,255,0.5);
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

// interface
interface CoinInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}
interface ICoinsProps {
    toggleDark: () => void;
}

function Coins({ toggleDark }: ICoinsProps) {
    const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins)
    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     (async() => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setCoins(json.slice(0,100));
    //         setLoading(false);
    //     })();
    // },[]);
    return (
        <Container>
            <Helmet>
                <title>
                    Coins
                </title>
            </Helmet>
            <Header>
                <Title>Coins</Title>
                <button onClick={toggleDark}>Toggle dark mode</button>
            </Header>
            {isLoading ?
                <Loader>Loading...</Loader> : (
                    <CoinsList>
                        {data?.slice(0, 100).map((coin) => (
                            <Coin key={coin.id}>
                                <Link to={{
                                    pathname: `/${coin.id}`,
                                    state: { name: coin.name }
                                }}>
                                    <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
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