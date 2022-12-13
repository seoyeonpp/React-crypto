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
// interface 이름 앞에 대문자 I를 보통 붙힌다. 
interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    contract: string;
    platform: string;
    logo: string;
    description: string;
    open_source: boolean;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface IPriceData {
    id : string;
    name : string;
    symbol : string;
    rank : number;
    circulating_supply : number;
    total_supply : number;
    max_supply : number;
    beta_value : number;
    first_data_at : string;
    last_updated : string;
    quotes : {
        ath_date : string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
    };
}


function Coin() {
    const [loading, setLoaing] = useState(true);
    const {coinId} = useParams<RouteParams>();
    const {state} = useLocation<RouteState>();
    const [info, setInfo] = useState<IInfoData>();
    const [priceInfo, setPriceInfo] = useState<IPriceData>();
    useEffect(() => {
        (async() => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            console.log(infoData)
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
            console.log(priceData)
            setInfo(infoData);
            setPriceInfo(priceData);
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