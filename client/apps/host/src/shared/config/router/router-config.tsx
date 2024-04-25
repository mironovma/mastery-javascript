/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { RouteProps } from "react-router-dom";

import { MainPage } from "@/pages/main-page";
import { AuthorizationPage } from "@/pages/authorization-page";

import { AppPage } from "@/pages/app-page";
import { AppCategoryPage } from "@/pages/app-category-page";
import { AppLearnPage } from "@/pages/app-learn-page";
import { AppRepeatPage } from "@/pages/app-repeat-page";

// @ts-ignore
import adminRouter from "admin/router-config";

export interface AppRoutesProps extends Pick<RouteProps, "path" | "element"> {
    authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = "main",
    AUTHORIZATION = "authorization",
    APP = "app",
    APP_CATEGORY = "app-category",
    APP_LEARN = "app-learn",
    APP_REPEAT = "app-repeat",

    NOT_FOUND = "not-found",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.AUTHORIZATION]: "/authorization",
    [AppRoutes.APP]: "/app",
    [AppRoutes.APP_CATEGORY]: "/app/category",
    [AppRoutes.APP_LEARN]: "/app/learn",
    [AppRoutes.APP_REPEAT]: "/app/repeat",

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
        authOnly: true,
    },
    [AppRoutes.APP_CATEGORY]: {
        path: RoutePath["app-category"],
        element: <AppCategoryPage />,
        authOnly: true,
    },
    [AppRoutes.APP_LEARN]: {
        path: RoutePath["app-learn"],
        element: <AppLearnPage />,
        authOnly: true,
    },
    [AppRoutes.APP_REPEAT]: {
        path: RoutePath["app-repeat"],
        element: <AppRepeatPage />,
        authOnly: true,
    },

    ...adminRouter,

    [AppRoutes.NOT_FOUND]: {
        path: RoutePath["not-found"],
        element: <>Not found</>,
    },
};
