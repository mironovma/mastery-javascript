import bcrypt from "bcryptjs";
import { v4 } from "uuid";

import { db } from "../helpers/db";
import { ApiError } from "../exceptions/api-error";
import { mailService } from "./mail-service";
import { UserDto } from "../dtos/user-dto";
import { tokenService } from "./token-service";

class UserService {
    async registration(email: string, password: string) {
        const user = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (user) {
            throw ApiError.BadRequest(
                "Пользователь с таким email уже существует"
            );
        }

        const hashPassword = await bcrypt.hash(password, 5);

        const activationLink = v4();

        const newUser = await db.user.create({
            data: {
                email,
                password: hashPassword,
                activationLink,
            },
        });

        await mailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api/activate/${activationLink}`
        );

        const userDto = new UserDto(newUser);

        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async activate(activationLink: string) {
        const user = await db.user.findFirst({
            where: {
                activationLink,
            },
        });

        if (!user) {
            throw ApiError.BadRequest("Некорректная ссылка активации");
        }

        await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                isActivated: true,
            },
        });
    }

    async login(email: string, password: string) {
        const user = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            throw ApiError.BadRequest(
                "Пользователь с таким email не был найден"
            );
        }

        const isPassEquals = await bcrypt.compare(password, user.password);

        if (!isPassEquals) {
            throw ApiError.BadRequest("Неверный пароль");
        }

        const userDto = new UserDto(user);

        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async logout(refreshToken: string) {
        const token = await tokenService.removeToken(refreshToken);

        return token;
    }

    async refreshToken(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await db.user.findUnique({
            where: {
                id: tokenFromDb.userId,
            },
        });

        if (!user) {
            throw ApiError.UnauthorizedError();
        }
        const userDto = new UserDto({
            id: user.id,
            email: user.email,
            isActivated: user.isActivated,
        });
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }
}

export const userService = new UserService();
