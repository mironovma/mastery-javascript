import webpack from "webpack";
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

import { BuildOptions } from "./types";

export const buildPlugins = ({
    paths,
    mode,
}: BuildOptions): webpack.Configuration["plugins"] => {
    const isDev = mode === "development";
    const isProd = mode === "production";

    const plugins = [
        new HtmlWebpackPlugin({
            minify: true,
            template: paths.html,
            publicPath: "/",
        }),
        new webpack.ProgressPlugin(),
    ];

    if (isDev) {
        plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash:8].css",
                chunkFilename: "css/[name].[contenthash:8].css",
            }),
            new CopyPlugin({
                patterns: [
                    { from: paths.locales, to: `${paths.output}/locales` },
                ],
            }),
        );
    }

    return plugins;
};
