import path from "path";
import webpack from "webpack";

import type { BuildMode, BuildPaths } from "@packages/config-webpack";
import { buildConfig } from "@packages/config-webpack";

import packageJson from "./package.json";

interface EnvVariables {
    mode: BuildMode;
    port: number;
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
        port: env.port ?? 3001,
        paths,
    });

    config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
            name: "admin",
            filename: "remoteEntry.js",
            // Указываем, что хотим предоставить host-контейнеру
            // В этом случае отдаем конфиг для роутера
            // Важно, чтобы экспорт этого конфига был по дефолту
            exposes: {
                "./router": "./src/shared/config/router/router-config.tsx",
                // отдать можно любой другой файл или несколько, просто перечисляя
            },
            shared: {
                ...packageJson.dependencies,
                react: {
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
