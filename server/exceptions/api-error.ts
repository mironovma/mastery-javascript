import { ZodIssue } from "zod";

export class ApiError extends Error {
    status: number;
    errors: ZodIssue[];

    constructor(status: number, message: string, errors: ZodIssue[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, "Пользователь не авторизован");
    }

    static BadRequest(message: string, errors: ZodIssue[] = []) {
        return new ApiError(400, message, errors);
    }
}
