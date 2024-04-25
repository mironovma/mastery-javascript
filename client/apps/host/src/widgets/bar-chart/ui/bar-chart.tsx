import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { DataPoint } from "../model/types";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

interface BarChartProps {
    data: DataPoint[];
}

export const BarChart = ({ data }: BarChartProps) => {
    const options: ChartOptions<"bar"> = {
        responsive: true,
        aspectRatio: 1,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                mode: "index",
                intersect: false,
            },
        },
        scales: {
            x: {
                type: "category",
                stacked: true,
                ticks: {
                    font: {
                        size: 10,
                    },
                },
            },
            y: {
                type: "linear",
                stacked: true,
                ticks: {
                    font: {
                        size: 10,
                    },
                },
            },
        },
    };

    const chartData = {
        labels: data.map((d) => d.date),
        datasets: [
            {
                label: "Новые карточки",
                data: data.map((d) => d.newCards),
                backgroundColor: "rgb(251 113 133)",
            },
            {
                label: "Повторений",
                data: data.map((d) => d.repeatedCards),
                backgroundColor: "rgb(253 224 71)",
            },
            {
                label: "Выученные",
                data: data.map((d) => d.learnedCards),
                backgroundColor: "rgb(74 222 128)",
            },
        ],
    };

    return <Bar options={options} data={chartData} />;
};
