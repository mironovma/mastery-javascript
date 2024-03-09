import { motion } from "framer-motion";
import { useCallback } from "react";

import { FlipCardQuestion } from "@/entities/FlipCardQuestion";

import { Button } from "@/shared/ui/button";
import { useCardDrag } from "@/shared/hooks/useCardDrag";
import { useCardControl } from "@/shared/hooks/useQuestionLoad";

import type { Task } from "../../model/types";

export const TaskList = () => {
    const {
        isLoading,
        questions,
        currentQuestionIndex,
        onQuestionsLoad,
        onQuestionsNext,
    } = useCardControl<Task>("/tasks");

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

    if (isLoading) {
        return <div>Загрзука...</div>;
    }

    if (currentQuestionIndex > 0 && currentQuestionIndex >= questions.length) {
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
        <div>
            <div className="flex justify-between">
                <Button onClick={onQuestionsLoad}>
                    Загрузить все карточки
                </Button>
            </div>

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
                        <FlipCardQuestion
                            question={questions[currentQuestionIndex].question}
                            answer={questions[currentQuestionIndex].answer}
                        />
                    </motion.div>
                    <div className="flex">
                        <Button
                            style={{
                                backgroundColor: left ? "green" : "",
                            }}
                            onClick={handleLeft}
                        >
                            Я знаю ответ
                        </Button>
                        <Button
                            style={{
                                backgroundColor: right ? "red" : "",
                            }}
                            onClick={handleRight}
                        >
                            Я не знаю ответ
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
