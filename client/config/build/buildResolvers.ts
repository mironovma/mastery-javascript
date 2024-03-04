import { Configuration } from "webpack";
import { BuildOption } from "./types";

export const buildResolvers = (
    options: BuildOption
): Configuration["resolve"] => {
    return {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@": options.paths.src,
        },
    };
};
