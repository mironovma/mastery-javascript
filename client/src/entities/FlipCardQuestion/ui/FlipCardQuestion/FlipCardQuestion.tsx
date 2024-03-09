import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/shared/ui/card";

const spring = {
    type: "spring",
    stiffness: 300,
    damping: 40,
};

interface FlipCardQuestionProps {
    question: string;
    answer: string;

    width?: string;
    height?: string;
}

export const FlipCardQuestion = ({
    question,
    answer,
    width = "250px",
    height = "250px",
}: FlipCardQuestionProps) => {
    const [isFlipped, setIsFplipped] = useState<boolean>(false);

    useEffect(() => {
        setIsFplipped(false);
    }, [question, answer]);

    const handleFlip = () => {
        setIsFplipped(true);
    };

    return (
        <div className="cursor-pointer select-none">
            <motion.div
                transition={spring}
                style={{
                    perspective: "1200px",
                    transformStyle: "preserve-3d",
                    width,
                    height,
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
                        <Card className="w-full h-full relative flex items-center overflow-hidden text-center">
                            <CardContent>{isFlipped && answer}</CardContent>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};
