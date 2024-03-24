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
        .max(32, {
            message: "Максимальная длина имени пользователя 32 символа",
        })
        .refine((value) => /^[a-zA-Z0-9_]*$/.test(value ?? ""), {
            message:
                "Допустимо использовать буквы латинского алфавита, цифры и _",
        })
        .optional(),
});
