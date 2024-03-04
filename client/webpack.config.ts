import path from "path";
import webpack from "webpack";

import type { BuildEnv, BuildPaths } from "./config/build/types";
import { buildWebpack } from "./config/build/buildWebpack";

export default (env: BuildEnv) => {
    const mode = env.mode || "development";
    const port = env.port || 3000;
    const isDev = mode === "development";
    const analyzer = env.analyzer;

    const paths: BuildPaths = {
        entry: path.resolve(__dirname, "src", "index.tsx"),
        build: path.resolve(__dirname, "build"),
        html: path.resolve(__dirname, "public", "index.html"),
        src: path.resolve(__dirname, "src"),
        public: path.resolve(__dirname, "public"),
    };

    const config: webpack.Configuration = buildWebpack({
        mode,
        paths,
        port,
        isDev,
        analyzer,
    });

    return config;
};
