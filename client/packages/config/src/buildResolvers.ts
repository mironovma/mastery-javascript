import webpack from "webpack";

import { BuildOptions } from "./types";

export const buildResolvers = ({
    paths,
}: BuildOptions): webpack.Configuration["resolve"] => {
    return {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@": paths.src,
        },
    };
};
