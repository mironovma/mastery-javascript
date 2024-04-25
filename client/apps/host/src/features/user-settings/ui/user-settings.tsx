import { observer } from "mobx-react-lite";
import { PencilIcon } from "lucide-react";

import {
    SectionMenuHeader,
    SectionMenuItem,
    SectionMenuWrapper,
} from "@/shared/ui/custom/section-menu";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@/shared/ui/drawer";
import { Button } from "@/shared/ui/button";

const dailyCardsToLearnButtons = [
    { variant: 1 },
    { variant: 2 },
    { variant: 3 },
    { variant: 4 },
    { variant: 5 },
    { variant: 7 },
    { variant: 10 },
    { variant: 15 },
    { variant: 20 },
];

interface UserSettingsProps {
    className?: string;
    learnedToday?: number;
    dailyCardsToLearn?: number;
    onSetNewDailyCardsToLearn: (amount: number) => void;
    onSaveNewUserSettings: () => void;
}

export const UserSettings = observer(
    ({
        className,
        learnedToday = 0,
        dailyCardsToLearn,
        onSetNewDailyCardsToLearn,
        onSaveNewUserSettings,
    }: UserSettingsProps) => {
        const circlePercentage = dailyCardsToLearn
            ? (learnedToday / dailyCardsToLearn) * 100
            : 0;
        return (
            <div className={className}>
                <SectionMenuHeader>Настройки</SectionMenuHeader>
                <SectionMenuWrapper>
                    <SectionMenuItem className="border-b-background border-b-2">
                        <div className="flex items-center gap-2">
                            <svg
                                width="56"
                                height="56"
                                viewBox="0 0 36 36"
                                className="circular-chart"
                            >
                                <path
                                    className="circle-bg"
                                    d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="rgba(0, 0, 0, .2)"
                                    strokeWidth="4"
                                    strokeDasharray="100, 100"
                                />
                                <path
                                    className="circle"
                                    d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#fb7185"
                                    strokeWidth="4"
                                    strokeDasharray={`${circlePercentage}, 100`}
                                />
                            </svg>
                            <div className="flex flex-col">
                                <div>Выучено сегодня</div>
                                <div className="flex text-2xl">
                                    <div className="font-medium">
                                        {learnedToday}
                                    </div>
                                    <div className="text-muted-foreground">
                                        /{dailyCardsToLearn}
                                    </div>
                                    <Drawer>
                                        <DrawerTrigger>
                                            <PencilIcon className="w-5 h-5 ml-4 self-center text-blue-400" />
                                        </DrawerTrigger>
                                        <DrawerContent>
                                            <div className="flex flex-col justify-center px-10 py-6">
                                                <p>
                                                    Сколько новых карточек в
                                                    день вы хотите изучать?
                                                </p>
                                                <div className="grid grid-cols-5 gap-2 my-6">
                                                    {dailyCardsToLearnButtons.map(
                                                        (button, index) => (
                                                            <Button
                                                                key={index}
                                                                className="p-7 text-lg"
                                                                variant={
                                                                    button.variant !==
                                                                    dailyCardsToLearn
                                                                        ? "outline"
                                                                        : "default"
                                                                }
                                                                size="icon"
                                                                onClick={() =>
                                                                    onSetNewDailyCardsToLearn(
                                                                        button.variant,
                                                                    )
                                                                }
                                                            >
                                                                {button.variant}
                                                            </Button>
                                                        ),
                                                    )}
                                                    <Button
                                                        className="w-14 h-14 text-lg"
                                                        variant="outline"
                                                        size="icon"
                                                        disabled
                                                    >
                                                        <PencilIcon />
                                                    </Button>
                                                </div>
                                                <p>
                                                    Каждый месяц вы сможете
                                                    выучить{" "}
                                                    {dailyCardsToLearn &&
                                                        dailyCardsToLearn *
                                                            30}{" "}
                                                    новых карточек
                                                </p>
                                                <DrawerClose asChild>
                                                    <Button
                                                        className="mt-6 mb-0 w-full"
                                                        onClick={
                                                            onSaveNewUserSettings
                                                        }
                                                    >
                                                        Сохранить
                                                    </Button>
                                                </DrawerClose>
                                            </div>
                                        </DrawerContent>
                                    </Drawer>
                                </div>
                            </div>
                        </div>
                    </SectionMenuItem>
                </SectionMenuWrapper>
            </div>
        );
    },
);
