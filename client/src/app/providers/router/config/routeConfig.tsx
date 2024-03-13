import { MainPage } from "@/pages/MainPage";
import { CardsCategoryPage, CardsPage } from "@/pages/CardsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

import {
    AppRoutes,
    getRouteCards,
    getRouteCardsCategory,
    getRouteMain,
    getRouteNotFound,
} from "@/shared/const/router";
import type { AppRoutesProps } from "@/shared/types/router";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.CARDS]: {
        path: getRouteCards(),
        element: <CardsPage />,
    },
    [AppRoutes.CARDS_CATEGORY]: {
        path: getRouteCardsCategory(":id"),
        element: <CardsCategoryPage />,
    },

    // Последним
    [AppRoutes.NOT_FOUND]: {
        path: getRouteNotFound(),
        element: <NotFoundPage />,
    },
};
