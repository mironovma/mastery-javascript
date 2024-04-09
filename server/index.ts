import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user";
import cardRouter from "./routes/card";
import categoryRouter from "./routes/category";
import { middlewareAuth } from "./middleware/auth-middleware";
import { middlewareError } from "./middleware/error-middleware";
import settingsRouter from "./routes/settings";
import statisticRouter from "./routes/statistic";

dotenv.config();

const PORT = +process.env.SERVER_PORT! || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
// Чтобы взаимодействовать с сервером из браузера
app.use(
    cors({
        // Разрешаем куки
        credentials: true,
        // URL фронтенда
        origin: process.env.CLIENT_URL!,
    })
);

app.use("/api", userRouter);
app.use("/api", cardRouter);
app.use("/api", categoryRouter);
app.use("/api", settingsRouter);
app.use("/api", statisticRouter);
app.use("/api", cardRouter);

// Для доступа к эндпоинтам только для авторизованных пользователей
// app.use(middlewareAuth);
// Все мидлварены для обработки ошибок всегда подключаем в конце
app.use(middlewareError);

const start = async () => {
    try {
        app.listen(PORT, () =>
            console.log(`Server is running on ${PORT} port`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
