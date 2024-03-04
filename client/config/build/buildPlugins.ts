import webpack, { Configuration } from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

import type { BuildOption } from "./types";

export const buildPlugins = ({
    mode,
    paths,
    analyzer,
}: BuildOption): Configuration["plugins"] => {
    const isDev = mode === "development";
    const isProd = mode === "production";

    let plugins: Configuration["plugins"] = [
        new HTMLWebpackPlugin({
            template: paths.html,
            // favicon: path.resolve(__dirname, paths.public, "favicon.png"),
            publicPath: "/",
        }),
    ];

    if (isDev) {
        plugins.push(
            new webpack.ProgressPlugin(),
            new ForkTsCheckerWebpackPlugin()
            // new ReactRefreshPlugin()
        );
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash:8].css",
                chunkFilename: "css/[name].[contenthash:8].css",
            })
        );
    }

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    return plugins;
};
