import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

function BarChart({datas}: any) {
    let width: any, height: any, gradient: any;
    function getGradient(ctx: any, chartArea: any) {
        const chartWidth = chartArea.right - chartArea.left;
        const chartHeight = chartArea.bottom - chartArea.top;
        if (gradient === null || width !== chartWidth || height !== chartHeight) {
            // Create the gradient because this is either the first render
            // or the size of the chart has changed
            width = chartWidth;
            height = chartHeight;
            gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, datas.gradient[0]);
            gradient.addColorStop(0.5, datas.gradient[1]);
            gradient.addColorStop(1, datas.gradient[2]);
        }

        return gradient;
    }

    const options = {
        responsive: true,
        plugins: {
            legend: false,
            title: {
                display: true,
                text: datas.title,
                color: "#fff"
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x',
                }
            }
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
        animations: {
            y: {
                easing: 'easeInOutElastic',
                from: (ctx: any) => {
                    if (ctx.type === 'data') {
                        if (ctx.mode === 'default' && !ctx.dropped) {
                            ctx.dropped = true;
                            return 0;
                        }
                    }
                }
            }
        }
    }
    const [datasets, setDatasets] = useState([12, 19, 3, 5])
    const [labels, setLabels] = useState(['Red', 'Blue', 'Yellow', 'Green'])
    const data = {
        labels: labels,
        datasets: [
            {
                data: datasets,
                backgroundColor: function (context: any) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        // This case happens on initial chart load
                        return null;
                    }
                    return getGradient(ctx, chartArea);
                },
                borderColor: datas.border,
                borderWidth: 1,
            },
        ],
    };
    const transactions = useSelector((state: any) => state.budget)
    useEffect(() => {
        const newDataset: any = []
        const newLabels: any = []
        transactions.map((t: any) => {
            if (t.type === datas.type) {
                newDataset.unshift(t.value)
                newLabels.unshift(t.date.slice(0, 5))
            }
        })
        setDatasets(newDataset)
        setLabels(newLabels)
    }, [transactions])

    return (
        <>
            <Bar data={data} options={options} />
        </>
    )
}

export default BarChart
