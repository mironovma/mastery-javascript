import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { routerConfig } from "@/shared/config/router/router-config";
import { PageLoader } from "@/shared/ui/custom/page-loader";
import { cn } from "@/shared/lib/utils";

interface AppRouterProps {
    className?: string;
}

export const AppRouter = ({ className }: AppRouterProps) => {
    return (
        <div className={cn("px-3 py-4", className)}>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {Object.values(routerConfig).map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    ))}
                </Routes>
            </Suspense>
        </div>
    );
};
