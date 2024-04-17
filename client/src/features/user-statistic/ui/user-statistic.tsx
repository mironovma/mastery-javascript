import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";

import {
    SectionMenuHeader,
    SectionMenuItem,
    SectionMenuWrapper,
} from "@/shared/ui/custom/section-menu";

// TODO: разделить BarChart и UserStatistic
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

interface DataPoint {
    date: string;
    newCards: number;
    learnedCards: number;
    repeatedCards: number;
}

interface BarChartProps {
    data: DataPoint[];
}

const BarChart = ({ data }: BarChartProps) => {
    const options: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
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
            },
            y: {
                type: "linear",
                stacked: true,
            },
        },
    };

    const chartData = {
        labels: data.map((d) => d.date),
        datasets: [
            {
                label: "Новые карточки",
                data: data.map((d) => d.newCards),
                backgroundColor: " rgb(156 163 175)",
            },
            {
                label: "Выученные",
                data: data.map((d) => d.learnedCards),
                backgroundColor: "rgb(74 222 128)",
            },
            {
                label: "Повторений",
                data: data.map((d) => d.repeatedCards),
                backgroundColor: "rgb(253 224 71)",
            },
        ],
    };

    return <Bar options={options} data={chartData} />;
};

const experimentalData: DataPoint[] = [
    { date: "2024-04-17", newCards: 5, learnedCards: 1, repeatedCards: 10 },
    { date: "2024-04-16", newCards: 5, learnedCards: 5, repeatedCards: 11 },
    { date: "2024-04-15", newCards: 5, learnedCards: 3, repeatedCards: 5 },
    { date: "2024-04-14", newCards: 5, learnedCards: 0, repeatedCards: 0 },
    { date: "2024-04-13", newCards: 5, learnedCards: 2, repeatedCards: 15 },
    { date: "2024-04-12", newCards: 5, learnedCards: 1, repeatedCards: 7 },
    { date: "2024-04-11", newCards: 5, learnedCards: 7, repeatedCards: 1 },
];

interface UserStatisticProps {
    className?: string;
}

export const UserStatistic = ({ className }: UserStatisticProps) => {
    return (
        <div className={className}>
            <SectionMenuHeader>Статистика</SectionMenuHeader>
            <SectionMenuWrapper>
                <SectionMenuItem className="flex-col border-b-background border-b-2">
                    <BarChart data={experimentalData} />
                    <div>Сводка</div>
                </SectionMenuItem>
            </SectionMenuWrapper>
        </div>
    );
};
