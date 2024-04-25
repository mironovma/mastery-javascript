import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({ message: "Email указан неверно" }),
    password: z
        .string()
        .min(6, { message: "Минимальная длина пароля составляет 6 символов" })
        .max(32, {
            message: "Максимальная длина пароля составляет 32 символа",
        }),
});

export const RegistrationSchema = z.object({
    email: z.string().email({ message: "Email указан неверно" }),
    password: z
        .string()
        .min(6, { message: "Минимальная длина пароля составляет 6 символов" })
        .max(32, {
            message: "Максимальная длина пароля составляет 32 символа",
        }),
    username: z
        .string()
        .optional()
        .refine(
            (value) =>
                value === undefined ||
                value.length === 0 ||
                (value.length >= 3 && value.length <= 32),
            {
                message: "Имя пользователя должно быть от 3 до 32 символов",
            },
        )
        .refine(
            (value) => value === undefined || /^[a-zA-Z0-9_]*$/.test(value),
            {
                message:
                    "Допустимо использовать буквы латинского алфавита, цифры и _",
            },
        ),
});

// Восстановление и смена пароля
export const ForgotPasswordSchema = z.object({
    email: z.string().email({ message: "Email указан неверно" }),
});

export const ForgotPasswordCodeSchema = z.object({
    code: z
        .string()
        .length(6, { message: "Код должен состоять из 6 символов" }),
});

export const ForgotPasswordNewPasswordSchema = z
    .object({
        password: z
            .string()
            .min(6, {
                message: "Минимальная длина пароля составляет 6 символов",
            })
            .max(32, {
                message: "Максимальная длина пароля составляет 32 символа",
            }),
        confirmPassword: z
            .string()
            .min(6, {
                message: "Минимальная длина пароля составляет 6 символов",
            })
            .max(32, {
                message: "Максимальная длина пароля составляет 32 символа",
            }),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                path: ["confirmPassword"],
                message: "Пароли не совпадают",
                code: "custom",
            });
        }
    });
