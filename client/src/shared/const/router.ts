export enum AppRoutes {
    MAIN = "main",

    // Последним
    NOT_FOUND = "not-found",
}

export const getRouteMain = () => "/";

export const getRouteNotFound = () => "*";

export const AppRouteByPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteNotFound()]: AppRoutes.NOT_FOUND,
};
