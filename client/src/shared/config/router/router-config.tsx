import { RouteProps } from "react-router-dom";

import { AboutPage } from "@/pages/about-page";
import { MainPage } from "@/pages/main-page";
import { AuthorizationPage } from "@/pages/authorization-page";

export interface AppRoutesProps extends Pick<RouteProps, "path" | "element"> {
    authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = "main",
    ABOUT = "about",
    AUTHORIZATION = "authorization",

    NOT_FOUND = "not-found",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.ABOUT]: "/about",
    [AppRoutes.AUTHORIZATION]: "/authorization",

    [AppRoutes.NOT_FOUND]: "/*",
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
        authOnly: true,
    },
    [AppRoutes.AUTHORIZATION]: {
        path: RoutePath.authorization,
        element: <AuthorizationPage />,
    },

    [AppRoutes.NOT_FOUND]: {
        path: RoutePath["not-found"],
        element: <>Not found</>,
    },
};
