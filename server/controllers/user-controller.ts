import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { ApiError } from "../exceptions/api-error";
import { userService } from "../services/user-service";

class UserController {
    // Функция, которая будет отрабатывать по роуту /registration
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            // Валидация ошибок с сервера
            // Здесь в validationResult достается тело и автоматически валидируется
            const errors = validationResult(req);

            // Если ошибки есть, то прокидываем ее
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest("Ошибка валидации", errors.array())
                );
            }

            // Достаем из request body с клиента email и password переданные из формы
            const { username, email, password } = req.body;
            // Вызываем сервис регистриции пользователя
            const userData = await userService.registration(
                username,
                email,
                password
            );

            /**
             * Сохраняем refresh токен в куки.
             *
             * refresh токен храним в httpOnly куках, а access токен в localStorage.
             * httpOnly значит, что эту куку нельзя получать и изменять в браузере из js.
             *
             * Первым параметром название для ключа в куках, по которому токен будет сохраняться,
             * а вторым непосредственно саму куку, т.е. resresh токен.
             * В опциях указываем срок жизни этой куки.
             * Делаем срок такой же, как и указали и token-service - 30 дней.
             *
             * Чтобы конструкция res.cookie() работала, нужно подключить
             * middleware cookie-parser. Это уже сделано в index.ts.
             */
            res.cookie("refreshToken", userData.refreshToken, {
                // 30 дней * 24 часа * 60 минут * 60 секунд * 1000 мс
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                // Если используется https подключени, то нужно поставить флаг secure
                // secure: true
            });

            /**
             * Этот контроллер (сервис этого контроллера) возвращает пару токенов
             * и информацию о пользователе.
             * Эту информацию нужно отправить на клиент, поэтому возвращаем это:
             */
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    // Функция, которая будет отрабатывать по роуту /login
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const userData = await userService.login(email, password);

            // Сохраняем refreshToken в куки.
            res.cookie("refreshToken", userData.refreshToken, {
                // 30 days before refresh token will die
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            /**
             * Этот контроллер (сервис этого контроллера) возвращает пару токенов
             * и информацию о пользователе.
             * Эту информацию нужно отправить на клиент, поэтому возвращаем это:
             */
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    // Функция, которая будет отрабатывать по роуту /logout
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            // Получаем refresh токен в куках
            const { refreshToken } = req.cookies;

            // И удаляеме его из БД через сервис userService.logout
            const token = await userService.logout(refreshToken);

            // Очищаем куки по ключу refreshToken
            res.clearCookie("refreshToken");

            // Можно просто вернуть 200 статус-код, но для наглядности вернем сам токен
            return res.json(token);
        } catch (error) {
            next(error);
        }
    }

    // Функция, которая будет отрабатывать по роуту /activate/:link для активации профиля
    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            // Получаем link, который у нас лежит в адресной строке при переходе по ссылке активации
            // См. эндпоинт:
            // :link - это динамическая часть, которую достаем, как раз, достаем.
            const activationLink = req.params.link;

            // Активируем пользователя с помощью сервиса userService:
            // просто обновляем в аккаунте поле isActivated на true
            await userService.activate(activationLink);

            // Когда пользователь перейдет по этой ссылке и выполнится активация аккаунта,
            // редиректим пользователя на клиент.
            // При клике по ссылке сначала активируем аккаунт, выполнив переход на бэк, а затем сразу редирект на клиент.
            // Происходит почти моментально, поэтому пользователь особенно ничего не замечает.
            return res.redirect(process.env.CLIENT_URL!);
        } catch (error) {
            next(error);
        }
    }

    // Восстановление пароля
    // Отправляем и записываем 6-значный код
    async forgotPasswordSendCode(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            // Получаем с клиента email
            const { email } = req.body;

            await userService.forgotPasswordSetCode(email);

            // Возвращаем email, как ответ от сервера (хотя можно было бы отправить просто сообщение об успешной отправке пароля)
            return res.json({
                message: "Код для восстановления пароля отправлен на почту",
            });
        } catch (error) {
            next(error);
        }
    }

    // Восстановление пароля
    // Проверяем 6-значный код в следующем инпуте
    async forgotPasswordAcceptCode(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            // Получаем с клиента 6-значный код. email храним в локальном стейте
            const { email, code } = req.body;

            await userService.forgotPasswordAcceptCode(email, code);

            return res.json({ message: "Придумайте новый пароль" });
        } catch (error) {
            next(error);
        }
    }

    // Восстановление пароля
    // Устанавливаем новый пароль
    // На клиенте делаем проверку: два раза попросить ввести пароль
    async forgotPasswordSetNewPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            // Получаем email и пароль. email храним в локальном стейте
            const { email, password } = req.body;

            await userService.forgotPasswordSetNewPassword(email, password);

            return res.json({
                message:
                    "Новый пароль установлен успешно! Пройдите авторизацию с новым паролем!",
            });
        } catch (error) {
            next(error);
        }
    }

    // Функция, которая будет отрабатывать по роуту /refresh
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            // Получаем из куки refresh окен
            const { refreshToken } = req.cookies;
            // В сервисе обновляем токены
            const userData = await userService.refreshToken(refreshToken);
            // Снова устанавливаем в куку токен
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            // Возвращаем данные о пользователе
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    // Функция, которая будет отрабатывать по роуту /users
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            // Для теста, чтобы проверить, что контроллер работает
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();
