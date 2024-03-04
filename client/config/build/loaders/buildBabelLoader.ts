import { BuildMode } from "../types";

export const buildBabelLoader = (mode: BuildMode) => {
    const isDev = mode === "development";

    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-typescript",
                    [
                        "@babel/preset-react",
                        {
                            runtime: isDev ? "automatic" : "classic",
                        },
                    ],
                ],
                plugins: undefined,
            },
        },
    };
};
