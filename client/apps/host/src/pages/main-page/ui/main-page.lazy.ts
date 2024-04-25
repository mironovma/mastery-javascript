import { lazy } from "react";

// export const MainPageLazy = lazy(() => import("./main-page"));
export const MainPageLazy = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-expect-error Задержка для теста, чтобы было видно fallback загрузки
            setTimeout(() => resolve(import("./main-page")), 2000);
        }),
);
