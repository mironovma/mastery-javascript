import { useState } from "react";
import { PanInfo } from "framer-motion";

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
    const [draggingDirection, setDraggingDirection] = useState<
        "left" | "right" | null
    >(null);

    const onDragStart = () => {
        setDraggingDirection(null);
    };

    const onDrag = (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        const direction = info.offset.x < 0 ? "left" : "right";
        setDraggingDirection(direction);

        if (direction === "left") {
            callbackOnDragLeft?.();
        } else {
            callbackOnDragRight?.();
        }
    };

    const onDragEnd = () => {
        if (draggingDirection === "left") {
            callbackLeft();
        }

        if (draggingDirection === "right") {
            callbackRight();
        }

        callbackFinally?.();
        setDraggingDirection(null);
    };

    return {
        left: draggingDirection === "left",
        right: draggingDirection === "right",
        onDrag,
        onDragStart,
        onDragEnd,
    };
};
