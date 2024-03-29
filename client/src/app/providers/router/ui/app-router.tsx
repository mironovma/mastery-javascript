import { Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";

import {
    AppRoutesProps,
    routerConfig,
} from "@/shared/config/router/router-config";
import { PageLoader } from "@/shared/ui/custom/page-loader";
import { cn } from "@/shared/lib/utils";

import { RequireAuth } from "./require-auth";

interface AppRouterProps {
    className?: string;
}

export const AppRouter = ({ className }: AppRouterProps) => {
    const renderWithWrapper = useCallback(
        ({ element, path, authOnly }: AppRoutesProps) => {
            const component = (
                <Suspense fallback={<PageLoader />}>{element}</Suspense>
            );

            return (
                <Route
                    key={path}
                    path={path}
                    element={
                        authOnly ? (
                            <RequireAuth>{component}</RequireAuth>
                        ) : (
                            component
                        )
                    }
                />
            );
        },
        [],
    );

    // return (
    //     <div className={cn("px-3 py-4", className)}>
    //         <Suspense fallback={<PageLoader />}>
    //             <Routes>
    //                 {Object.values(routerConfig).map(({ path, element }) => (
    //                     <Route key={path} path={path} element={element} />
    //                 ))}
    //             </Routes>
    //         </Suspense>
    //     </div>
    // );

    return (
        <div className={cn("px-3 py-4", className)}>
            <Routes>
                {Object.values(routerConfig).map(renderWithWrapper)}
            </Routes>
        </div>
    );
};
