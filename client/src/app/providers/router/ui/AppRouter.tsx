import { Suspense, memo, useCallback } from "react";
import { Route, Routes } from "react-router-dom";

import { AppRoutesProps } from "@/shared/types/router";
import { routeConfig } from "../config/routeConfig";
import { cn } from "@/shared/lib/utils";

interface AppRouterProps {
    className?: string;
}

const AppRouter = ({ className }: AppRouterProps) => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            // TODO: сделать нормальный лоадер для подгрузки страниц
            <Suspense fallback={<div>Loading...</div>}>
                {route.element}
            </Suspense>
        );

        return <Route key={route.path} path={route.path} element={element} />;
    }, []);

    return (
        <div className={cn(className)}>
            <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
        </div>
    );
};

export default memo(AppRouter);
