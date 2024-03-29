import { User } from "@prisma/client";

// DTO - data transfer object
// Часть нечувствительных данных о пользователе для генерации jwt токенов
// Исключаем пароль, т.к. это чувствительные данные
export class UserDto {
    id: string;
    email: string;
    username: string | null;
    isActivated: boolean;
    registrationDate: Date;

    constructor(
        model: Omit<User, "activationLink" | "password" | "restorePasswordCode">
    ) {
        this.id = model.id;
        this.email = model.email;
        this.username = model.username;
        this.isActivated = model.isActivated;
        this.registrationDate = model.registrationDate;
    }
}
