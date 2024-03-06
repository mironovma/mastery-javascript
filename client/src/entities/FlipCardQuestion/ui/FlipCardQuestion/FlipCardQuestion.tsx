import { useState } from "react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/shared/ui/card";

const spring = {
    type: "spring",
    stiffness: 300,
    damping: 40,
};

interface FlipCardQuestionProps {
    width?: string;
    height?: string;

    question: string;
    answer: string;

    handleLeft?: () => void;
    handleRight?: () => void;
}

export const FlipCardQuestion = ({
    width = "250px",
    height = "250px",
    question,
    answer,
    handleLeft,
    handleRight,
}: FlipCardQuestionProps) => {
    const [isFlipped, setIsFplipped] = useState<boolean>(false);

    const handleClick = () => {
        setIsFplipped((prev) => !prev);
    };

    return (
        <div className="cursor-pointer select-none">
            <motion.div
                onClick={handleClick}
                transition={spring}
                style={{
                    perspective: "1200px",
                    transformStyle: "preserve-3d",
                    width,
                    height,
                }}
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
                        animate={{ rotateY: isFlipped ? -180 : 0 }}
                        transition={spring}
                        style={{
                            width: "100%",
                            height: "100%",
                            zIndex: isFlipped ? 0 : 1,
                            backfaceVisibility: "hidden",
                            position: "absolute",
                        }}
                    >
                        <Card className="w-full h-full relative flex items-center overflow-hidden text-center">
                            <div className="absolute right-0 w-1/2 h-full bg-red-700/40" />
                            <div className="absolute w-1/2 h-full bg-green-500/40" />
                            <CardContent>{question}</CardContent>
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
                        <Card className="w-full h-full relative flex items-center overflow-hidden text-center">
                            <div
                                onClick={handleRight}
                                className="absolute right-0 w-1/2 h-full bg-red-700/40"
                            />
                            <div
                                onClick={handleLeft}
                                className="absolute w-1/2 h-full bg-green-500/40"
                            />
                            <CardContent>{answer}</CardContent>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};
