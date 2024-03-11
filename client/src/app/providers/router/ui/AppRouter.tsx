import { Suspense, memo, useCallback } from "react";
import { Route, Routes } from "react-router-dom";

import { AppRoutesProps } from "@/shared/types/router";
import { routeConfig } from "../config/routeConfig";

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            // TODO: сделать нормальный лоадер для подгрузки страниц
            <Suspense fallback={<div>Loading...</div>}>
                {route.element}
            </Suspense>
        );

        return <Route key={route.path} path={route.path} element={element} />;
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
