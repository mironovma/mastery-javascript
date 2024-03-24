import { Request, Response, NextFunction } from "express";

import { ApiError } from "../exceptions/api-error";

/**
 * Middleware для обработки ошибок на сервере.
 *
 * Есть еще второй вариант попроще:
 * при неудачных запросах из блока catch в сервисах возвращать по эндпоинтам объект с ошибкой и ее описанием,
 * которые далее можно рендерить на клиенте.
 */

export const middlewareError = (
    err: {},
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Если это ошибка является инстансом ApiError, то сразу отправляем ответ на клиент
    if (err instanceof ApiError) {
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors });
    }

    // Если условие не выполнилось, значит, мы ее не предусмотрели. Тогда просто прокидываем 500 статус
    return res
        .status(500)
        .json({ message: "Произошла непредвиденная ошибка " + err });
};
