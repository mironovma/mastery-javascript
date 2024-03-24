import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { ApiError } from "../exceptions/api-error";
import { tokenService } from "../services/token-service";

/**
 * Миддлварена для проверки авторизован ли пользователь или нет.
 * Если да, то, напр., даем доступ до к-л эндпоинтов.
 * Иначе прокидываем ошибку.
 */

interface ExtendedRequest extends Request {
    user?: string | JwtPayload;
}

export const middlewareAuth = (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        /**
         * Получаем headers. Там должен лежать ключ authorization.
         * Если есть, значит, пользователь авторизован.
         */
        const authorizationHeader = req.headers.authorization;

        // Если таких headers нет, то кидаем ошибку
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        // Получаем токен. Т.к. он состоит из двух строк (Bearer <сам-токен>), то сплитим его и получаем только токен.
        // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX" ->
        // ["Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX"]
        const accessToken = authorizationHeader.split(" ")[1];

        // Снова можно сделать проверку: если этого токена нет, то пробрасываем ошибку
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        // Если токен есть, то валидируем его с помощью tokeService.validateAccessToken
        const userData = tokenService.validateAccessToken(accessToken);

        // Если валидарцию не прошли (в сервисе в блоке catch получаем null), то кидаем ошибку
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        // Если все ок и токен валидный, то
        // добавляем новое поле и помещаем туда данные о пользователе
        req.user = userData;
        // А далее вызываем next и передаем управление следующему middleware (см. router/index.ts)
        next();
    } catch (error) {
        // Ошибка будет, если пользователь будет неавторизован. Прокидываем ошибку
        return next(ApiError.UnauthorizedError());
    }
};
