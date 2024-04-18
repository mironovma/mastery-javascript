import { BarChart } from "@/widgets/bar-chart";
import { useMobxStore } from "@/shared/hooks/useMobxStore";
import {
    SectionMenuHeader,
    SectionMenuItem,
    SectionMenuWrapper,
} from "@/shared/ui/custom/section-menu";
import { Skeleton } from "@/shared/ui/skeleton";
import { prepareStatistics } from "../lib";

interface UserStatisticProps {
    className?: string;
}

export const UserStatistic = ({ className }: UserStatisticProps) => {
    const { statistic } = useMobxStore();

    if (statistic.isLoading) {
        return <Skeleton className="w-full h-48" />;
    }

    if (!statistic.statisticAll) {
        return (
            <div className={className}>
                <SectionMenuHeader>Статистика</SectionMenuHeader>
                <SectionMenuWrapper>
                    <SectionMenuItem className="flex-col items-start border-b-background border-b-2">
                        <p>
                            Начните изучать карточки для отображения статистики
                        </p>
                    </SectionMenuItem>
                </SectionMenuWrapper>
            </div>
        );
    }

    const preparedStatistic = prepareStatistics(statistic.statisticAll);

    return (
        <div className={className}>
            <SectionMenuHeader>Статистика</SectionMenuHeader>
            <SectionMenuWrapper>
                <SectionMenuItem className="flex-col items-start border-b-background border-b-2">
                    <BarChart data={preparedStatistic} />
                    <div>
                        Сводка (две колонки: всего | за 7 дней (два столбца))
                    </div>
                </SectionMenuItem>
            </SectionMenuWrapper>
        </div>
    );
};
