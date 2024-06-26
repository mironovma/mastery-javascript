import { Router } from "express";
import { body } from "express-validator";

import { userController } from "../controllers/user-controller";
import { middlewareAuth } from "../middleware/auth-middleware";

const userRouter = Router();

// Эндпоинт для регистрации
userRouter.post(
    "/registration",
    /**
     * Валидация на сервере с помощью Express.js.
     * В качестве хорошего аналога можно использовать zod.js
     */
    body("email").isEmail(),
    body("password").isLength({ min: 6, max: 32 }),

    userController.registration
);
// Эндпоинт для авторизации
userRouter.post("/login", userController.login);
// Эндпоинт для деаутентификации
userRouter.post("/logout", userController.logout);
// Эндпоинты для восстановления пароля
// Отправляем и записываем в БД 6-значный код для восстановления
userRouter.post(
    "/forgot-password/send-code",
    userController.forgotPasswordSendCode
);
// Проверяем 6-значный код в следующем инпуте
userRouter.post(
    "/forgot-password/check-code",
    userController.forgotPasswordAcceptCode
);
// Вводим новый пароль в следующем инпуте, хешируем и сохраняем его
// TODO: сделать валидацию длины пароля
userRouter.post(
    "/forgot-password/set-new-password",
    userController.forgotPasswordSetNewPassword
);
// Эндпоинт для активации аккаунта по ссылке, которая будет приходить на почту пользователя
userRouter.get("/activate/:link", userController.activate);
// Эндпоинт для обновления access токена, если он умер (отправляем refresh токен и получаем новую пару access и refresh токенов)
userRouter.get("/refresh", userController.refresh);
// ТЕСТОВЫЙ ТОЛЬКО ДЛЯ АВТОРИЗОВАННЫХ ПОЛЬЗОВАТЕЛЕЙ
// Эндпоинт для получения всего списка пользователей (необязательный)
// Этот эндпоинт доступен только для авторизованных пользователей, поэтому здесь указываем
// middleware для проверки авторизован ли пользователь
userRouter.get("/users", middlewareAuth, userController.getUsers);

export default userRouter;
