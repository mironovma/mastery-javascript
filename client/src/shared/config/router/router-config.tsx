import { RouteProps } from "react-router-dom";

import { MainPage } from "@/pages/main-page";
import { AuthorizationPage } from "@/pages/authorization-page";

import { AppPage } from "@/pages/app-page";
import { AppCategoryPage } from "@/pages/app-category-page";

export interface AppRoutesProps extends Pick<RouteProps, "path" | "element"> {
    authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = "main",
    AUTHORIZATION = "authorization",
    APP = "app",
    APP_CATEGORY = "app-category",

    NOT_FOUND = "not-found",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.AUTHORIZATION]: "/authorization",
    [AppRoutes.APP]: "/app",
    [AppRoutes.APP_CATEGORY]: "/app/category",

    [AppRoutes.NOT_FOUND]: "/*",
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.AUTHORIZATION]: {
        path: RoutePath.authorization,
        element: <AuthorizationPage />,
    },
    [AppRoutes.APP]: {
        path: RoutePath.app,
        element: <AppPage />,
        // authOnly: true,
    },
    [AppRoutes.APP_CATEGORY]: {
        path: RoutePath["app-category"],
        element: <AppCategoryPage />,
        // authOnly: true,
    },

    [AppRoutes.NOT_FOUND]: {
        path: RoutePath["not-found"],
        element: <>Not found</>,
    },
};
