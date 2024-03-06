import { useState } from "react";

import { FlipCardQuestion } from "@/entities/FlipCardQuestion";
import { Button } from "@/shared/ui/button";

import { fetchTasks } from "../../api";
import type { Task } from "../../model/types";

export const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [end, setEnd] = useState<boolean>(false);
    const [curr, setCurr] = useState<{ id: number; total: number }>({
        id: 0,
        total: tasks.length,
    });

    /**
     * TODO:
     * Логика такая:
     *
     * вне зависимости от того, куда нажимаю (влево или вправо),
     * меняется curr, который выступает id для всего массива вопросов;
     *
     * в зависимости от того, куда нажимаю (влево или вправо),
     * сохраняю в бд пользователя, как memorized вопрос, а, если вправо, то
     * сохраняю в бд пользователя, как вопрос для повторения в будущем.
     *
     * ---
     *
     * После каждого ответа на вопрос, записываю варианты ответа пользователя в
     * стор (напр., использовать mobx). Когда карточки закончились, отправляю данные из
     * стора (ответы на вопросы - какие знаю, а какие нет) в БД пользователя, чтобы потом подобные
     * вопросы не повторялись у него.
     */

    const getAllTasks = async () => {
        try {
            const response = await fetchTasks();
            setTasks(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const clearAllTasks = () => {
        setTasks([]);
        setCurr({ id: 0, total: 0 });
    };

    const onNextTask = () => {
        if (curr.id <= curr.total) {
            setCurr(({ id, ...rest }) => ({ ...rest, id: id + 1 }));
        } else {
            setEnd(true);
        }
    };

    const handleLeft = () => {
        console.log("Знаю ответ на вопрос");
        onNextTask();
    };

    const handleRight = () => {
        console.log("Не знаю ответа на вопрос");
        onNextTask();
    };

    if (end) {
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
                <Button variant="destructive" onClick={clearAllTasks}>
                    Очистить
                </Button>
            </div>

            {!!tasks.length && (
                <FlipCardQuestion
                    question={tasks[curr.id].question}
                    answer={tasks[curr.id].answer}
                    handleLeft={handleLeft}
                    handleRight={handleRight}
                />
            )}
        </div>
    );
};
