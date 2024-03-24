import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user";
import { middlewareAuth } from "./middleware/auth-middleware";
import { middlewareError } from "./middleware/error-middleware";

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
