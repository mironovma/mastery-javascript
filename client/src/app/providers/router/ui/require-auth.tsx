import { Navigate, useLocation } from "react-router-dom";

import { RoutePath } from "@/shared/config/router/router-config";
import { useMobxStore } from "@/shared/hooks/useMobxStore";
import { useEffect, useState } from "react";
import { PageLoader } from "@/shared/ui/custom/page-loader";

interface RequireAuthProps {
    children: JSX.Element;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
    const { auth } = useMobxStore();
    const location = useLocation();

    // TODO: костыль с 0 задержкой, чтобы isAuth успел проинициализироваться
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setIsChecking(false);
        }, 50);

        return () => clearTimeout(timerId);
    }, [auth.isAuth, auth.isLoading]);

    if (isChecking) {
        return <PageLoader />;
    }

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
