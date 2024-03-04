import { Configuration } from "webpack";

import { BuildOption } from "./types";

import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildPlugins } from "./buildPlugins";
import { buildDevServer } from "./buildDevServer";

export const buildWebpack = (options: BuildOption): Configuration => {
    const { mode, paths, isDev } = options;

    return {
        mode: mode ?? "development",

        entry: paths.entry,
        output: {
            filename: "[name].[contenthash:8].js",
            path: paths.build,
            publicPath: "/",
            clean: true,
        },

        plugins: buildPlugins(options),

        module: {
            rules: buildLoaders(options),
        },

        resolve: buildResolvers(options),

        devtool: isDev ? "eval-cheap-source-map" : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    };
};
