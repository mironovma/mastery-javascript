import { ReactNode, useEffect, useState } from "react";

import { Theme, ThemeProviderContext } from "@/shared/hooks/useTheme";

interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

export const ThemeProvider = ({
    children,
    defaultTheme = "system",
    storageKey = "ui-theme",
    ...props
}: ThemeProviderProps) => {
    const [theme, setTheme] =
        useState<Theme>(() => localStorage.getItem(storageKey) as Theme) ||
        defaultTheme;

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("dark", "light");

        if (theme === "system") {
            const systemTheme = window.matchMedia(
                "(prefers-color-scheme: dark)",
            ).matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme as string);
    }, [theme]);

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme);
            // TODO:
            // @ts-ignore
            setTheme(theme);
        },
    };

    return (
        // TODO:
        // @ts-ignore
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
};
