import { motion } from "framer-motion";
import { useState } from "react";

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
}

export const FlipCardQuestion = ({
    width = "250px",
    height = "250px",
    question,
    answer,
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
                        <motion.div
                            drag="x"
                            dragConstraints={{ left: 1, right: 1 }}
                            className="touch-none"
                        >
                            <Card className="w-full h-full relative flex items-center overflow-hidden text-center">
                                <CardContent>{answer}</CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};
