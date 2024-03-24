import bcrypt from "bcryptjs";
import { v4 } from "uuid";

import { db } from "../helpers/db";
import { UserDto } from "../dtos/user-dto";
import { tokenService } from "./token-service";
import { mailService } from "./mail-service";
import { ApiError } from "../exceptions/api-error";

class UserService {
    // Сервис для контроллера userController.registration по роуту /registration
    async registration(username: string, email: string, password: string) {
        // Ищем пользователя с таким же email
        // Если такой email уже будет зарегистрирован, то прокинем ошибку
        const user = await db.user.findUnique({
            where: {
                email,
            },
        });

        // ... и, если уже есть пользователь с таким же email, то выкидываем ошибку.
        if (user) {
            throw ApiError.BadRequest(
                `Пользователя с email ${email} уже существует`
            );
        }

        // Если нет, то создаем нового пользователя с таким email и сохраняем его
        // Хэшируем пароль. Нельзя хранить его открыто в БД.
        // Даже если кто-то получит доступ к БД, то расшифровать пароль, скорее всего, не получится
        // Как проверить правильный ли пароль? Хешируем пароль при логине и сравниваем с тем, что лежит в БД
        const hashPassword = await bcrypt.hash(password, 5);

        // Генерируем рандомную строку с помощью uuid, которая далее будет линком для активации аккаунта
        const activationLink = v4();

        // Создаем пользователя
        const newUser = await db.user.create({
            data: {
                email,
                password: hashPassword,
                activationLink,
                username,
            },
        });

        // Отправляем email для подтверждения регистрации с помощью mail-service
        // await mailService.sendActivationMail(
        //     email,
        //     `${process.env.API_URL}/api/activate/${activationLink}`
        // );

        // Для токенов нужны данные (payload - нечувствительные данные о пользователе) для генерации токенов
        // Для этого будем использовать DTO - data transfer object (часть данных пользователя)
        // Это как раз часть нечувствительных данных о пользователе, которые мы можем передать для генерации
        // Для этого используем класс-хелпер для создания UserDto
        // Аргументом туда передаем нового созданного пользователя, НО
        // в классе возьмем только id, email и флаг isActivated
        const userDto = new UserDto(newUser);

        // Генерируем и сохраняем access и refresh токены
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        // Возвращаем  объект с токенами и информацией о пользователе
        return { ...tokens, user: userDto };
    }

    // Активация аккаунта по ссылке на почте
    async activate(activationLink: string) {
        // Ищем пользователя по уникальному линку для активации
        const user = await db.user.findFirst({
            where: {
                activationLink,
            },
        });

        // Если пользователя с такой ссылкой не нашли, значит, ссылка была неверная
        if (!user) {
            throw ApiError.BadRequest("Некорректная ссылка активации");
        }

        // Если пользователь с такой ссылкой был найдет, то активируем аккаунт (просто isActivated ставим в true)
        await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                isActivated: true,
            },
        });
    }

    // Авторизация
    async login(email: string, password: string) {
        // Ищем пользователя с таким email
        const user = await db.user.findUnique({
            where: {
                email,
            },
        });

        // Если такого нет, значит, он не зарегистрирован и выкидываем ошибку.
        if (!user) {
            throw ApiError.BadRequest(
                "Пользователь с таким email не существует"
            );
        }

        // Если есть, то сверяем введенный пароль и хэш-пароль.
        // Введенный пароль хешируется с помощью compare и сравнивается с хешем.
        const isPassEquals = await bcrypt.compare(password, user.password);

        // Если пароли не сходятся - выкидываем ошибку
        if (!isPassEquals) {
            throw ApiError.BadRequest("Неверный пароль");
        }

        /**
         * Создаем экземпляр DTO - data transfer object в качестве payload для генерации токенов.
         * Будем использовать для передачи нечувствительных данных (id, email, isActivated) для генерации токенов.
         * Все так же, как при регистрации.
         */
        const userDto = new UserDto(user);

        // Генерируем и сохраняем токены.
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        // Возвращаем объект с токенами и нечувствительными данными о пользователе
        return { ...tokens, user: userDto };
    }

    // Функция деаутентификации
    async logout(refreshToken: string) {
        // Удаляем refresh токен из БД с помощью tokenService.removeToken
        const token = await tokenService.removeToken(refreshToken);

        return token;
    }

    // Обновление refresh токена
    async refreshToken(refreshToken: string) {
        // Если токена нет, значит пользователь не авторизован и прокидываем ошибку
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        // Валидируем refresh токен
        const userData = tokenService.validateRefreshToken(refreshToken);
        // Нужно убедиться, что этот токен действительно находится в БД
        const tokenFromDb = await tokenService.findToken(refreshToken);

        // Если валидация не пройдена или такого токена нет в БД, то выкидываем ошибку
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        // Получаем актуальню информацию о пользователе по токену
        const user = await db.user.findUnique({
            where: {
                id: tokenFromDb.userId,
            },
        });

        // Если такого пользователя нет, то кидаем ошибку
        if (!user) {
            throw ApiError.UnauthorizedError();
        }
        // Если проверка пройдена, то генерируем новую пару токенов и сохраняем
        const userDto = new UserDto({
            id: user.id,
            email: user.email,
            username: user.username,
            isActivated: user.isActivated,
        });
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        // Возвращаем токены и данный о пользователе
        return { ...tokens, user: userDto };
    }

    // Получение списка всех пользователей из БД (но только для авторизованных)
    // Реализация получения данных по роуту /users только для авторизованных пользователей делаем с помощью middleware auth-middleware.ts
    async getAllUsers() {
        const users = await db.user.findMany();
        return users;
    }
}

export const userService = new UserService();
