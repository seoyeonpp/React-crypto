import ApexCharts from 'apexcharts';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

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
    return <div>{isLoading ? ("Loading chart...") : (<ApexChart type='line' options={{
        chart: {
            width: 500,
            height: 500,
        }
    }}/>)}</div>
}

export default Chart;