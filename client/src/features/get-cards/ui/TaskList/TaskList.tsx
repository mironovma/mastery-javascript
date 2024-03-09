import { motion } from "framer-motion";
import { useState } from "react";

import { FlipCardQuestion } from "@/entities/FlipCardQuestion";
import { useCardDrag } from "@/shared/hooks/useCardDrag";
import { Button } from "@/shared/ui/button";

import { fetchTasks } from "../../api";
import type { Task } from "../../model/types";

export const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [curr, setCurr] = useState<{ id: number; total: number }>({
        id: 0,
        total: tasks.length,
    });
    const [tasksEnd, setTasksEnd] = useState<boolean>(false);

    const getAllTasks = async () => {
        try {
            const response = await fetchTasks();
            setTasks(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const onNextTask = () => {
        if (curr.id <= curr.total) {
            setCurr(({ id, ...rest }) => ({ ...rest, id: id + 1 }));
        } else {
            setTasksEnd(true);
        }
    };

    const handleLeft = () => {
        console.log("Знаю ответ на вопрос");
        onNextTask();
        return false;
    };

    const handleRight = () => {
        console.log("Не знаю ответа на вопрос");
        onNextTask();
        return false;
    };

    const { left, right, onDragStart, onDrag, onDragEnd } = useCardDrag({
        callbackLeft: handleLeft,
        callbackRight: handleRight,
    });

    if (tasksEnd) {
        return (
            <div>
                <h3>Карточки закончились</h3>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between">
                <Button onClick={getAllTasks}>Загрузить все карточки</Button>
            </div>

            {!!tasks.length && (
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
                            question={tasks[curr.id].question}
                            answer={tasks[curr.id].answer}
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
