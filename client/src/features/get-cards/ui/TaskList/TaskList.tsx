import { PanInfo, motion, useMotionValue } from "framer-motion";
import { useState } from "react";

import { FlipCardQuestion } from "@/entities/FlipCardQuestion";
import { Button } from "@/shared/ui/button";

import { fetchTasks } from "../../api";
import type { Task } from "../../model/types";

export const TaskList = () => {
    /**
     * TODO:
     * Сделать кастомный хук для этих трех состояний,
     * чтобы не было нагромождений.
     */
    const [tasks, setTasks] = useState<Task[]>([]);
    const [end, setEnd] = useState<boolean>(false);
    const [curr, setCurr] = useState<{ id: number; total: number }>({
        id: 0,
        total: tasks.length,
    });

    const x = useMotionValue(0);

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

    /**
     * TODO:
     * Обернуть в useDebounce, чтобы лишние вызовы пропускать.
     * Можно тоже обернуть в кастомный хук и использовать.
     * Из хука можно доставать:
     * + обновленную координату по Х,
     * + функцию onDragX и onDragXEnd
     */

    const onDrag = (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ): void => {
        x.set(info.point.x);
        console.log(`X: ${info.point.x}`);
        /**
         * TODO: Как определять по координате Х свайп: знаю ответ или нет?
         */
    };

    const onDragEnd = () => {
        console.log(`Дарг закончился с координатой: ${x.get()}`);

        if (x.get() > 50) {
            handleRight();
        }

        if (x.get() < 50) {
            handleLeft();
        }
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
                <div>
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: 1, right: 1 }}
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
                        <Button onClick={handleLeft}>Я знаю ответ</Button>
                        <Button onClick={handleRight}>Я не знаю ответ</Button>
                    </div>
                </div>
            )}
        </div>
    );
};
