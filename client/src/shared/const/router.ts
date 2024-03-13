export enum AppRoutes {
    MAIN = "main",
    CARDS = "cards",
    CARDS_CATEGORY = "cards-category",
    // Последним
    NOT_FOUND = "not-found",
}

export const getRouteMain = () => "/";
export const getRouteCards = () => "/cards";
export const getRouteCardsCategory = (id: string) => `/cards/${id}`;

export const getRouteNotFound = () => "*";

export const AppRouteByPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteCards()]: AppRoutes.CARDS,
    [getRouteCardsCategory("id")]: AppRoutes.CARDS_CATEGORY,
    // Последним
    [getRouteNotFound()]: AppRoutes.NOT_FOUND,
};
