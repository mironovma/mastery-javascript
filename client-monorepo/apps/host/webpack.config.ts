import path from "path";
import webpack from "webpack";

import type { BuildMode, BuildPaths } from "@packages/webpack-config";
import { buildConfig } from "@packages/webpack-config";

import packageJson from "./package.json";

interface EnvVariables {
    mode: BuildMode;
    port: number;

    ADMIN_REMOTE_URL?: string;
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, "src", "index.tsx"),
        output: path.resolve(__dirname, "build"),
        html: path.resolve(__dirname, "public", "index.html"),
        src: path.resolve(__dirname, "src"),
        locales: path.resolve(__dirname, "public", "locales"),
    };

    const config = buildConfig({
        mode: env.mode ?? "development",
        port: env.port ?? 3000,
        paths,
    });

    const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? "http://localhost:3001";

    config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
            // Название микрофронта (микросервиса)
            name: "host",
            // Название файла, по которому будет удаленно подключаться host. Обычно называеют remoteEntry.js
            filename: "remoteEntry.js",

            // Указываем пути до remoteEntry.js файлов, которые указываем и в самих сервисах (admin)
            // И указываем remote url на котором крутятся микрофронты
            remotes: {
                admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
                // название-другого-сервиса: путь с url до remoteEntry.js
            },

            // Здесь указываем общие библиотеки для host и микрофронтов
            // А также можем указать необходимые версии этих либ
            shared: {
                // Спредим зависимости и далее указываем общие.
                // ХОТЯ можно было бы просто оставить одну строчку ...packageJson.dependencies, и все будет работать
                // Можно пойти дальше и сделать общий конфиг для ModuleFederation и шарить его между сервисами
                ...packageJson.dependencies,
                react: {
                    // eager опция - загрузить либу сразу (немедленно)
                    eager: true,
                    requiredVersion: packageJson.dependencies["react"],
                },
                "react-router-dom": {
                    eager: true,
                    requiredVersion:
                        packageJson.dependencies["react-router-dom"],
                },
                "react-dom": {
                    eager: true,
                    requiredVersion: packageJson.dependencies["react-dom"],
                },
            },
        }),
    );

    return config;
};
