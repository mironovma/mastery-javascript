import { Navigate, useLocation } from "react-router-dom";

import { useMobxStore } from "@/shared/hooks/useMobxStore";
import { RoutePath } from "@/shared/config/router/router-config";

interface RequireAuthProps {
    children: JSX.Element;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
    const { auth } = useMobxStore();
    const location = useLocation();

    if (!auth.isAuth) {
        return (
            <Navigate
                to={RoutePath.authorization}
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
};
