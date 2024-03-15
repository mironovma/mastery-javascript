import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { db } from "../helpers/db";

class TokenService {
    generateTokens(
        payload: Omit<User, "password" | "activationLink" | "name">
    ) {
        const accessToken = jwt.sign(
            { ...payload, type: "access" },
            process.env.JWT_ACCESS_SECRET!,
            {
                expiresIn: "30m",
            }
        );

        const refreshToken = jwt.sign(
            { ...payload, type: "access" },
            process.env.JWT_REFRESH_SECRET!,
            {
                expiresIn: "30d",
            }
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await db.token.findUnique({
            where: {
                userId,
            },
        });
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

        const token = await db.token.create({
            data: {
                userId,
                refreshToken,
            },
        });

        return token;
    }

    async removeToken(refreshToken: string) {
        const token = await db.token.findFirst({
            where: {
                refreshToken,
            },
        });

        const tokenData = await db.token.delete({
            where: {
                id: token?.id,
                refreshToken,
            },
        });

        return tokenData;
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

            return userData;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);

            return userData;
        } catch (error) {
            return null;
        }
    }

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
