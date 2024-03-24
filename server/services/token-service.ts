import jwt from "jsonwebtoken";

import { User } from "@prisma/client";
import { db } from "../helpers/db";

class TokenService {
    // Генерируем access и refresh токенов для user
    generateTokens(
        // payload - нечувствительные данные о пользователе (данные, которые вшиваются в токен)
        payload: Omit<User, "password" | "activationLink" | "name">
    ) {
        // Генерация access токена

        /**
         * Первам параметром как раз передаем payload, а вторым секретный ключ.
         * Секретные ключи должны быть и для access, и для refresh токенов.
         * Храним их в .env. Это может быть любая рандомная строка
         * или можно воспользоваться каким-либо сторонним сервисом по генерации таких рандомных строк.
         *
         * Третьим аргументов указываем время жизни access токена.
         * По истечению жизни access токена, на сервер будем отправлять
         * refresh токен по эндпоинту refresh (это сделаем в интерсепторе axios, если будет выбивать 401 статус),
         * который хранится в куках, и получать новую пару access и refresh
         */
        const accessToken = jwt.sign(
            { ...payload, type: "access" },
            process.env.JWT_ACCESS_SECRET!,
            {
                expiresIn: "30m",
            }
        );

        // Генерация refresh токена
        // Если refresh устарел, то пользователю придется заново логиниться и вместе с этим будет создана новая пара access и refresh
        const refreshToken = jwt.sign(
            { ...payload, type: "access" },
            process.env.JWT_REFRESH_SECRET!,
            {
                expiresIn: "30d",
            }
        );

        // Возвращаем пару access и refresh
        return {
            accessToken,
            refreshToken,
        };
    }

    // Сохраняем refresh токен в БД

    /**
     * Если пользователь залогинился или зарегистрировался,
     * то создаем для него новый refresh токен.
     *
     * Принимаем id пользователя и сам refresh токен.
     *
     * Есть нюанс: если зайти с другого устройства, то придется заново авторизоваться,
     * создастся новый токен, а со старого устройства пользователя выкенет.
     * Если такое поведение не устраивает, то нужно сделать реализацию сохранения нескольких токенов для одного пользователя,
     * но нужно учитывать, что токены могут перезаписываться и умирать по истечению срока.
     * Нужно продумать механиз по удалению протухших токенов иначе БД будет помойкой для старых токенов.
     */
    async saveToken(userId: string, refreshToken: string) {
        // Перед тем, как сохранять refresh токен, сначала пробуем найти такой токен по id пользователя
        const tokenData = await db.token.findUnique({
            where: {
                userId,
            },
        });

        // Если такой refresh токен есть, то перезаписываем его для конкретного пользователя
        if (tokenData) {
            const updatedToken = await db.token.update({
                where: {
                    id: tokenData.id,
                },
                data: {
                    refreshToken,
                },
            });

            return updatedToken;
        }

        // Иначе создаем новый токен для пользователя
        const token = await db.token.create({
            data: {
                userId,
                refreshToken,
            },
        });

        // Возвращаем токен
        return token;
    }

    // Удаляем токен (если, напр., пользователь сделал логаут)
    async removeToken(refreshToken: string) {
        // Ищем такой токен
        const token = await db.token.findFirst({
            where: {
                refreshToken,
            },
        });

        // И удаляем такой токен по id
        const tokenData = await db.token.delete({
            where: {
                id: token?.id,
                refreshToken,
            },
        });

        return tokenData;
    }

    // Валидация access токена при обновлении
    // Проверяем, что токен валидный и срок годности у него не иссяк
    validateAccessToken(token: string) {
        try {
            // Валидируем токен (проверка: есть ли secret key в переданном токене)
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

            return userData;
        } catch (error) {
            // Если токен невалидный, то посто прокидываем пустое значение
            return null;
        }
    }

    // Валидация refresh токена при обновлении, как и access
    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);

            return userData;
        } catch (error) {
            return null;
        }
    }

    /**
     * Проверка на существование токена в БД
     * Выполняем верификацию токенов (см. выше) и проверяем есть ли такой токен в БД,
     * чтобы избежать подмены токена.
     */
    async findToken(refreshToken: string) {
        const tokenData = await db.token.findFirst({
            where: {
                refreshToken,
            },
        });

        return tokenData;
    }
}

export const tokenService = new TokenService();
