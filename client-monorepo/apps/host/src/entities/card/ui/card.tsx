import { memo, useState } from "react";
import { ChevronLeftIcon, EyeIcon, LayoutListIcon } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/shared/ui/drawer";

interface CardProps {
    className?: string;
    category: string;
    question: string;

    shortAnswer: string;
    detailedAnswer?: string;
    options?: Array<{ answer: string; isTrue: boolean }>;

    acceptButtonLabel: string;
    declineButtonLabel: string;
    onAccept: () => void;
    onDecline: () => void;
}

export const Card = memo(
    ({
        className,
        category,
        question,
        shortAnswer,
        detailedAnswer,
        options,
        acceptButtonLabel,
        declineButtonLabel,
        onAccept,
        onDecline,
    }: CardProps) => {
        const [isEyePressed, setIsEyePressed] = useState<boolean>(false);
        const [isListPressed, setIsListPressed] = useState<boolean>(false);

        return (
            <div className={className}>
                <div className="w-full h-card flex flex-col justify-between bg-primary-foreground rounded-md">
                    <div className="p-10">
                        <div className="text-sm text-muted-foreground">
                            {category}
                        </div>
                        <h2 className="mt-4 text-lg font-semibold">
                            {question}
                        </h2>
                    </div>

                    {!isEyePressed && !isListPressed && (
                        <div className="mt-10 self-center">
                            <Button
                                className="p-11 mr-2"
                                size="icon"
                                variant="outline"
                                onClick={() => setIsEyePressed(true)}
                            >
                                <div>
                                    <EyeIcon />
                                </div>
                            </Button>
                            {options && (
                                // TODO: Реализовать функционал для выбора варианта ответа
                                <Button
                                    className="p-11"
                                    size="icon"
                                    variant="outline"
                                    disabled
                                    onClick={() => setIsListPressed(true)}
                                >
                                    <div>
                                        <LayoutListIcon />
                                    </div>
                                </Button>
                            )}
                        </div>
                    )}

                    {isEyePressed && (
                        <div className="flex flex-col self-center gap-2 p-10">
                            <p className="font-semibold">{shortAnswer}</p>
                            {detailedAnswer && (
                                <Drawer>
                                    <DrawerTrigger asChild>
                                        <button className="text-sm underline self-start">
                                            Читать подробнее...
                                        </button>
                                    </DrawerTrigger>
                                    <DrawerContent className="min-h-96">
                                        <p className="px-10 py-6 h-80 overflow-y-auto">
                                            {detailedAnswer}
                                        </p>
                                    </DrawerContent>
                                </Drawer>
                            )}
                        </div>
                    )}

                    {isListPressed && (
                        <div className="self-center p-10">
                            <ul className="w-full flex flex-col gap-2 text-sm">
                                {options?.map((opt) => (
                                    <li
                                        key={opt.answer}
                                        className="p-2 rounded-md bg-slate-400/10"
                                    >
                                        {opt.answer}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-auto mb-0">
                        <div className="flex items-center justify-between">
                            <Button
                                variant="ghost"
                                className="flex justify-between items-center w-full py-8 hover:bg-green-400/60"
                                onClick={onAccept}
                            >
                                <span className="flex-grow text-wrap">
                                    {acceptButtonLabel}
                                </span>
                                <ChevronLeftIcon />
                            </Button>
                            <Button
                                variant="ghost"
                                className="flex justify-between items-center w-full py-8 hover:bg-gray-400/60"
                                onClick={onDecline}
                            >
                                <ChevronLeftIcon className="rotate-180" />
                                <span className="flex-grow text-wrap">
                                    {declineButtonLabel}
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
);
