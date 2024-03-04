import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import type { BuildOption } from "./types";
import { buildBabelLoader } from "./loaders/buildBabelLoader";

export const buildLoaders = ({
    mode,
    isDev,
}: BuildOption): ModuleOptions["rules"] => {
    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
    };

    const svgLoader = {
        test: /\.svg$/i,
        use: [
            {
                loader: "@svgr/webpack",
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: "convertColors",
                                params: {
                                    currentColor: true,
                                },
                            },
                        ],
                    },
                },
            },
        ],
    };

    const cssLoader = {
        test: /\.(s[ac]ss|css)$/i,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                    modules: {
                        auto: (resPath: string) =>
                            !!resPath.includes(".module."),
                        localIdentName: isDev
                            ? "[path][name]__[local]--[hash:base64:8]"
                            : "[hash:base64:8]",
                    },
                },
            },
            {
                loader: "postcss-loader",
                options: {
                    postcssOptions: {
                        plugins: [["postcss-preset-env"]],
                    },
                },
            },
            "sass-loader",
        ],
    };

    const babelLoader = buildBabelLoader(mode);

    return [assetLoader, svgLoader, cssLoader, babelLoader];
};
