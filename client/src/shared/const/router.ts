export enum AppRoutes {
    MAIN = "main",
    CATEGORIES = "categories",
    // Последним
    NOT_FOUND = "not-found",
}

export const getRouteMain = () => "/";
export const getCategories = () => "/categories";
export const getRouteNotFound = () => "*";

export const AppRouteByPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getCategories()]: AppRoutes.CATEGORIES,
    [getRouteNotFound()]: AppRoutes.NOT_FOUND,
};
