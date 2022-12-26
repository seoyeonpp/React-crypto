import ApexCharts from 'apexcharts';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

interface PriceProps {
    coinId: string;
    isDark: boolean;
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

function Price({ coinId, isDark }: PriceProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId));
    return <div>
        {isLoading ? ("Loading Price...") : (
            <ApexChart
                type='candlestick'
                series={[
                    {
                        name: 'price',
                        data:
                            data?.map((price) => {
                                return [price.time_close, price.open, price.high, price.low, price.close]
                            }) as []
                    }
                ]}
                options={{
                    theme: {
                        mode: isDark ? "dark" : 'light'
                    },
                    chart: {
                        background: 'transparent',
                        width: 500,
                        height: 350,
                        toolbar: {
                            show: false,
                        }
                    },
                    grid: { show: false },
                    yaxis: { show: false },
                    xaxis: {
                        type: 'datetime',
                    },
                    plotOptions: {
                        candlestick: {
                            colors: {
                                upward: '#ff7675',
                                downward: '#fab1a0'
                            }
                        }
                    }
                }}
            />
        )}
    </div>
}

export default Price;