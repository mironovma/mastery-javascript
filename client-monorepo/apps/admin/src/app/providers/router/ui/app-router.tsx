import { Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";

import routerConfig, {
    AppRoutesProps,
} from "@/shared/config/router/router-config";
import { PageLoader } from "@/shared/ui/custom/page-loader";
import { cn } from "@/shared/lib/utils";

interface AppRouterProps {
    className?: string;
}

export const AppRouter = ({ className }: AppRouterProps) => {
    const renderWithWrapper = useCallback(
        ({ element, path, authOnly }: AppRoutesProps) => {
            const component = (
                <Suspense fallback={<PageLoader />}>{element}</Suspense>
            );

            return <Route key={path} path={path} element={component} />;
        },
        [],
    );

    return (
        <div className={cn("px-3 py-4", className)}>
            <Routes>
                {Object.values(routerConfig).map(renderWithWrapper)}
            </Routes>
        </div>
    );
};
