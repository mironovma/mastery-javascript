import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

const springConfig = {
    type: "spring",
    stiffness: 300,
    damping: 40,
};

interface SingleCardTaskProps {
    question: string;
    answer: string;
    left: boolean;
    right: boolean;
    handleLeft: () => void;
    handleRight: () => void;
}

export const SingleCardTask = ({
    question,
    answer,
    left,
    right,
    handleLeft,
    handleRight,
}: SingleCardTaskProps) => {
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    useEffect(() => {
        setIsFlipped(false);
    }, [question, answer]);

    const handleFlip = () => {
        setIsFlipped(true);
    };

    const controllButtons = (
        <div className="flex justify-between">
            <Button
                className={cn(
                    "rounded-none rounded-tr-md",
                    left && "bg-green-500 text-white"
                )}
                variant="outline"
                onClick={handleLeft}
            >
                Я знаю ответ
            </Button>
            <Button
                className={cn(
                    "rounded-none rounded-tl-md",
                    right && "bg-red-500 text-white"
                )}
                variant="outline"
                onClick={handleRight}
            >
                Я не знаю ответ
            </Button>
        </div>
    );

    return (
        <div className="cursor-pointer select-none">
            <motion.div
                transition={springConfig}
                style={{
                    perspective: "1200px",
                    transformStyle: "preserve-3d",
                    width: "100%",
                    height: "350px",
                }}
                onClick={handleFlip}
            >
                <motion.div
                    animate={{
                        rotateY: isFlipped ? -180 : 0,
                    }}
                    transition={springConfig}
                    style={{
                        width: "100%",
                        height: "100%",
                        zIndex: isFlipped ? 0 : 1,
                        backfaceVisibility: "hidden",
                        position: "absolute",
                    }}
                >
                    <Card className="w-full h-full overflow-hidden text-center">
                        <CardContent className="h-full relative flex flex-col justify-center items-center">
                            <p className="text-sm">{question}</p>
                            <div className="w-full absolute bottom-0">
                                {controllButtons}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div
                    initial={{ rotateY: 180 }}
                    animate={{ rotateY: isFlipped ? 0 : 180 }}
                    transition={springConfig}
                    style={{
                        width: "100%",
                        height: "100%",
                        zIndex: isFlipped ? 0 : 1,
                        backfaceVisibility: "hidden",
                        position: "absolute",
                    }}
                >
                    <Card className="w-full h-full overflow-hidden text-center">
                        <CardContent className="h-full relative flex flex-col justify-center items-center">
                            <p className="text-sm">{isFlipped && answer}</p>
                            <div className="w-full absolute bottom-0">
                                {controllButtons}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
};
