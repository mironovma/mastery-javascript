export type BuildMode = "development" | "production";

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
    public: string;
}

export interface BuildOption {
    mode: BuildMode;
    paths: BuildPaths;
    port: number;
    analyzer: boolean;
    isDev: boolean;
}

export interface BuildEnv {
    mode: BuildMode;
    analyzer: boolean;
    port: number;
}
