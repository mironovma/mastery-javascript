import { PanInfo } from "framer-motion";
import { useState } from "react";

interface UseCardDragProps {
    callbackLeft: () => void;
    callbackRight: () => void;

    callbackOnDragLeft?: () => void;
    callbackOnDragRight?: () => void;

    callbackFinally?: () => void;
}

/**
 * @returns:
 * @left - флаг: в текущий момент происходит драг влево
 * @right - флаг: в текущий момент происходит драг вправо
 * @onDrag - отрабатывает в момент драга
 * @onDragStart - отрабатывает в момент начала драга
 * @onDragEnd - отрабатывает в момент окончания драга
 *
 * @callbackLeft - срабатывает при свайпе влево
 * @callbackRight - срабатывает при свайпе вправо
 * @callbackOnDragLeft - срабатывает в момент драга влево (опционально)
 * @callbackOnDragRight - срабатывает в момент драга вправо (опционально)
 * @callbackFinally - срабатывает при свайпе в любую сторону (опционально)
 */
export const useCardDrag = ({
    callbackLeft,
    callbackRight,
    callbackFinally,

    callbackOnDragLeft,
    callbackOnDragRight,
}: UseCardDragProps) => {
    // Для вычисления куда был сделан свайп
    const [startX, setStartX] = useState<number>(0);
    // Флаг left и right для получения данных в какую сторону в данный момент происходит свайп
    const [left, setLeft] = useState<boolean>(false);
    const [right, setRight] = useState<boolean>(false);

    // onDragStart
    const onDragStart = (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ): void => {
        setStartX(info.point.x);
    };

    // onDrag
    const onDrag = (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        const currentX = info.point.x;

        if (currentX < startX) {
            callbackOnDragLeft && callbackOnDragLeft();
            setLeft(true);
            setRight(false);
        }

        if (currentX > startX) {
            callbackOnDragRight && callbackOnDragRight();
            setLeft(false);
            setRight(true);
        }
    };

    // onDragEnd
    const onDragEnd = (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        const endX = info.point.x;

        if (endX < startX) {
            callbackLeft();
        }

        if (endX > startX) {
            callbackRight();
        }

        callbackFinally && callbackFinally();
        setLeft(false);
        setRight(false);
    };

    return {
        left,
        right,
        onDrag,
        onDragStart,
        onDragEnd,
    };
};
