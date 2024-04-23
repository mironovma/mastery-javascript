export const prepareStatistics = (statistics: any, days: number = 7) => {
    const today = new Date();
    const preparedStatistic = [];
    const dateMap = new Map();

    statistics.forEach((stat: any) => {
        const formattedDate = String(stat.date).split("T")[0];
        dateMap.set(formattedDate, stat);
    });

    for (let i = 0; i < 7; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        const dateStr = checkDate.toISOString().split("T")[0];

        if (dateMap.has(dateStr)) {
            preparedStatistic.push(dateMap.get(dateStr));
        } else {
            preparedStatistic.push({
                date: dateStr,
                newCards: 0,
                learnedCards: 0,
                repeatedCards: 0,
            });
        }
    }

    return preparedStatistic
        .map((stat) => {
            return {
                ...stat,
                date: stat.date.split("T")[0],
            };
        })
        .sort(
            (a, b) =>
                new Date(a.date as string).getTime() -
                new Date(b.date as string).getTime(),
        );
};
