import { MainPage } from "@/pages/MainPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

import {
    AppRoutes,
    getRouteMain,
    getRouteNotFound,
} from "@/shared/const/router";
import type { AppRoutesProps } from "@/shared/types/router";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },

    // Последним
    [AppRoutes.NOT_FOUND]: {
        path: getRouteNotFound(),
        element: <NotFoundPage />,
    },
};
