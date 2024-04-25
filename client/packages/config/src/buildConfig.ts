import webpack from "webpack";

import type { BuildOptions } from "./types";

import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";
import "webpack-dev-server";

export const buildConfig = (options: BuildOptions): webpack.Configuration => {
    const { mode, paths } = options;

    const isDev = mode === "development";

    return {
        mode,

        entry: paths.entry,
        output: {
            path: paths.output,
            filename: "[name].[contenthash:8].js",
            clean: true,
        },

        plugins: buildPlugins(options),

        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),

        devtool: isDev ? "eval" : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    };
};
