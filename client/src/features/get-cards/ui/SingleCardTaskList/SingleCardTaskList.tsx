import { motion } from "framer-motion";
import { memo, useCallback, useEffect } from "react";

import { SingleCardTask } from "@/entities/SingleCardTask";

import { Button } from "@/shared/ui/button";
import { useCardTask } from "@/shared/hooks/useCardTask";
import { useCardDrag } from "@/shared/hooks/useCardDrag";
import { TaskCategory, TaskType } from "@/shared/types/tasks";
import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui/skeleton";

interface SingleCardTaskListProps {
    className?: string;
    category: TaskCategory;
    type: TaskType;
    limit?: number;
}

export const SingleCardTaskList = memo(
    ({ className, category, type, limit }: SingleCardTaskListProps) => {
        const {
            isLoading,
            questions,
            currentQuestionIndex,
            onQuestionsLoad,
            onQuestionsNext,
        } = useCardTask({
            url: "/tasks",
            category,
            type,
            limit,
        });

        const handleLeft = useCallback(() => {
            console.log(
                "Знаю ответ на вопрос " + questions[currentQuestionIndex].id
            );
            onQuestionsNext();
        }, [onQuestionsNext]);

        const handleRight = useCallback(() => {
            console.log(
                "Не знаю ответа на вопрос " + questions[currentQuestionIndex].id
            );
            onQuestionsNext();
        }, [onQuestionsNext]);

        const { left, right, onDragStart, onDrag, onDragEnd } = useCardDrag({
            callbackLeft: handleLeft,
            callbackRight: handleRight,
        });

        useEffect(() => {
            onQuestionsLoad();
        }, []);

        if (isLoading) {
            return <Skeleton className="w-full h-[350px]" />;
        }

        if (
            currentQuestionIndex > 0 &&
            currentQuestionIndex >= questions.length
        ) {
            return (
                <div>
                    <h3>Карточки закончились</h3>
                    <Button onClick={onQuestionsLoad}>
                        Перезагрузить карточки
                    </Button>
                </div>
            );
        }

        return (
            <div className={cn(className)}>
                {/* <div>
                    <Button onClick={onQuestionsLoad}>
                        Загрузить все карточки
                    </Button>
                </div> */}

                {!!questions.length && (
                    <div>
                        <motion.div
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragStart={onDragStart}
                            onDrag={onDrag}
                            onDragEnd={onDragEnd}
                            className="touch-none"
                        >
                            <SingleCardTask
                                question={
                                    questions[currentQuestionIndex].question
                                }
                                answer={
                                    questions[currentQuestionIndex].answerText!
                                }
                                left={left}
                                right={right}
                                handleLeft={handleLeft}
                                handleRight={handleRight}
                            />
                        </motion.div>
                    </div>
                )}
            </div>
        );
    }
);
