import { Button } from "@/shared/ui/button";
import { ChevronLeftIcon, EyeIcon, LayoutListIcon } from "lucide-react";

interface CardProps {
    className?: string;
    category?: string;
    question?: string;
    shortAnswer?: string;
    detailedAnswer?: string;
    options?: Array<{ answer: string; isRight: boolean }>;
}

export const Card = ({
    className,
    category,
    question,
    shortAnswer,
    detailedAnswer,
    options,
}: CardProps) => {
    return (
        <div className={className}>
            <div className="w-full h-card flex flex-col justify-between bg-primary-foreground rounded-md">
                <div className="p-10">
                    <div className="text-sm text-muted-foreground">
                        JavaScript - начальный уровень
                    </div>
                    <div className="mt-4 text-lg font-semibold">
                        Как работает прототипное наследование в JavaScript?
                    </div>
                </div>
                <div className="mt-10 self-center">
                    <Button className="p-11 mr-2" size="icon" variant="outline">
                        <div>
                            <EyeIcon />
                        </div>
                    </Button>
                    <Button className="p-11" size="icon" variant="outline">
                        <div>
                            <LayoutListIcon />
                        </div>
                    </Button>
                </div>
                <div className="mt-auto mb-0">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            className="flex justify-between items-center w-full py-8 hover:bg-green-400/60"
                        >
                            <span className="flex-grow">
                                Я уже знаю эту карточку
                            </span>
                            <ChevronLeftIcon />
                        </Button>
                        <Button
                            variant="ghost"
                            className="flex justify-between items-center w-full py-8 hover:bg-gray-400/60"
                        >
                            <ChevronLeftIcon className="rotate-180" />
                            <span className="flex-grow">
                                Начать учить карточку
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
