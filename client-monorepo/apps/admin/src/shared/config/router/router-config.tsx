import { RouteProps } from "react-router-dom";

// TODO: изменить название папки!!!
import { AdminPage } from "@/pages/main-page";

export interface AppRoutesProps extends Pick<RouteProps, "path" | "element"> {
    authOnly?: boolean;
}

export enum AppRoutes {
    ADMIN = "admin",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.ADMIN]: "/admin",
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.ADMIN]: {
        path: RoutePath.admin,
        element: <AdminPage />,
        // authOnly: true,
    },
};

export default routerConfig;
