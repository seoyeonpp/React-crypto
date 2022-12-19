import ApexCharts from 'apexcharts';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { type } from '@testing-library/user-event/dist/type';

interface ChartProps {
    coinId : string;
}
interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

function Chart({ coinId }:ChartProps) {
    const {isLoading, data} = useQuery<IHistorical[]>(['ohlcv',coinId], () => fetchCoinHistory(coinId));

    return <div>{isLoading ? ("Loading chart...") : (
    <ApexChart 
        type='line'
        series={[
            {
                name: 'price',
                data : data?.map((price) => Number(price.close)) as number[]
            }
        ]}
        options={{
            theme:{
                mode: "dark"
            },
            chart: {
                background: 'transparent',
                width: 500,
                height: 500,
                toolbar: {
                    show: false,
                }
            },
            stroke: {
                // curve: 'smooth',
                width: 3,
            },
            grid:{show: false},
            yaxis: {show: false},
            xaxis: {
                axisBorder: {show: false},
                axisTicks: {show: false},
                labels:{show: false},
                type: 'datetime',
                categories: data?.map((price) => price.time_close),
            },
            fill: {
                type: 'gradient',
                gradient: {gradientToColors: ['hotpink'], stops: [0,100]},
            },
            colors: ['pink'],
            tooltip: {
                y: {
                    formatter: (value) => `$ ${value.toFixed(2)}`
                }
            }
        }}
    />
    )}</div>
}

export default Chart;