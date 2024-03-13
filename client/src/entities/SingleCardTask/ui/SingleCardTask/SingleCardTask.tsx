import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

const spring = {
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
    const [isFlipped, setIsFplipped] = useState<boolean>(false);

    useEffect(() => {
        setIsFplipped(false);
    }, [question, answer]);

    const handleFlip = () => {
        setIsFplipped(true);
    };

    const controllButtons = (
        <div className="flex justify-between">
            <Button
                variant="outline"
                className="rounded-none"
                onClick={handleLeft}
                style={{
                    backgroundColor: left ? "green" : "",
                }}
            >
                Я знаю ответ
            </Button>
            <Button
                variant="outline"
                className="rounded-none"
                onClick={handleRight}
                style={{
                    backgroundColor: right ? "red" : "",
                }}
            >
                Я не знаю ответ
            </Button>
        </div>
    );

    return (
        <div className="cursor-pointer select-none">
            <motion.div
                transition={spring}
                style={{
                    perspective: "1200px",
                    transformStyle: "preserve-3d",
                    width: "100%",
                    height: "350px",
                }}
                onClick={handleFlip}
            >
                <div
                    style={{
                        perspective: "1200px",
                        transformStyle: "preserve-3d",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <motion.div
                        animate={{
                            rotateY: isFlipped ? -180 : 0,
                        }}
                        transition={spring}
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
                        transition={spring}
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
                </div>
            </motion.div>
        </div>
    );
};
