import { Configuration as DevServerConfiguration } from "webpack-dev-server";

import { BuildOption } from "./types";

export const buildDevServer = ({
    port,
}: BuildOption): DevServerConfiguration => {
    return {
        port,
        hot: true,
        open: true,
        historyApiFallback: true,
    };
};
