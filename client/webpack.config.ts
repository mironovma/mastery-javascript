import path from "path";

import type { BuildMode, BuildPaths } from "./config/build/types";
import { buildConfig } from "./config/build/buildConfig";

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
        port: env.port ?? 3000,
        paths,
    });

    return config;
};
