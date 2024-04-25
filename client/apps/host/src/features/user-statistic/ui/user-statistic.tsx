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

    const newAll = statistic.statisticAll
        .map((stat) => stat.newCards)
        .reduce((acc, curr) => acc + curr, 0);

    const repeatedAll = statistic.statisticAll
        .map((stat) => stat.repeatedCards)
        .reduce((acc, curr) => acc + curr, 0);

    const learnedAll = statistic.statisticAll
        .map((stat) => stat.learnedCards)
        .reduce((acc, curr) => acc + curr, 0);

    const new7days = preparedStatistic
        .map((stat) => stat.newCards)
        .reduce((acc, curr) => acc + curr, 0);

    const repeated7days = preparedStatistic
        .map((stat) => stat.repeatedCards)
        .reduce((acc, curr) => acc + curr, 0);

    const learned7days = preparedStatistic
        .map((stat) => stat.learnedCards)
        .reduce((acc, curr) => acc + curr, 0);

    return (
        <div className={className}>
            <SectionMenuHeader>Статистика</SectionMenuHeader>
            <SectionMenuWrapper>
                <SectionMenuItem className="flex-col items-start border-b-background border-b-2">
                    <BarChart data={preparedStatistic} />
                    <div className="grid grid-cols-2 gap-x-1 items-center">
                        <div>
                            <p className="text-muted-foreground text-xs">
                                всего
                            </p>
                            <div>{newAll ?? 0}</div>
                            <div>{repeatedAll ?? 0}</div>
                            <div>{learnedAll ?? 0}</div>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs">
                                7 дней
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="w-5">{new7days ?? 0}</div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-rose-400 rounded-[1px]" />{" "}
                                    <p className="text-xs">Новые карточки</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="w-5">{repeated7days ?? 0}</div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-[1px]" />{" "}
                                    <p className="text-xs">Повторений</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="w-5">{learned7days ?? 0}</div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-[1px]" />{" "}
                                    <p className="text-xs">Выученные</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionMenuItem>
            </SectionMenuWrapper>
        </div>
    );
};
