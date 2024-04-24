import { RouteProps } from "react-router-dom";

import { AdminPage } from "@/pages/admin-page";

export interface AppRoutesProps extends Pick<RouteProps, "path" | "element"> {
    authOnly?: boolean;
}

export enum AppRoutes {
    ADMIN = "admin",
    ADMIN_USERS = "admin_users",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.ADMIN]: "/admin",
    [AppRoutes.ADMIN_USERS]: "/admin/users",
};

const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.ADMIN]: {
        path: RoutePath.admin,
        element: <AdminPage />,
        // authOnly: true
    },
    [AppRoutes.ADMIN_USERS]: {
        path: RoutePath.admin_users,
        element: <div>ADMIN USERS PAGE</div>,
    },
};

export default routerConfig;
