import { ValidationError } from "express-validator";

/**
 * Класс (middleware) для обработки ошибок
 */

export class ApiError extends Error {
    status: number;
    errors: ValidationError[];

    constructor(
        // https статус
        status: number,
        message: string,
        errors: ValidationError[] = []
    ) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    // static-функции - это функции, которые можно использовать НЕ СОЗДАВАЯ экземпляр класса
    static UnauthorizedError() {
        return new ApiError(401, "Пользователь не авторизован");
    }

    static BadRequest(message: string, errors: ValidationError[] = []) {
        return new ApiError(400, message, errors);
    }
}
