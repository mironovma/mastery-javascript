import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./router";

dotenv.config();

const PORT = +process.env.SERVER_PORT! || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        // Разрешаем куки
        credentials: true,
        // URL фронтенда
        origin: process.env.CLIENT_URL!,
    })
);

app.use("/api", router);
// Все мидлварены подключаем в конце
// app.use(middlewareError);

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