export type BuildMode = "development" | "production";

export interface BuildPaths {
    entry: string;
    output: string;
    html: string;
    src: string;
    locales: string;
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    port: number;
}
