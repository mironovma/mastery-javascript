import { memo } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

import { useTheme } from "@/shared/hooks/useTheme";
import { Switch } from "@/shared/ui/switch";

export const ThemeSwitcher = memo(() => {
    const { theme, setTheme } = useTheme();

    const onThemeChange = () => {
        if (theme === "light") {
            setTheme("dark");
        }

        if (theme === "dark") {
            setTheme("light");
        }

        if (theme === "system") {
            setTheme("dark");
        }

        if (!theme) {
            setTheme("dark");
        }
    };

    const iconStyle = "size-4 mt-[2px]";
    const iconByTheme =
        theme === "dark" ? (
            <MoonIcon className={iconStyle} />
        ) : (
            <SunIcon className={iconStyle} />
        );

    return (
        <div>
            <Switch
                withIcon
                checked={theme === "dark"}
                onCheckedChange={onThemeChange}
            >
                <div className="flex justify-center items-center">
                    {iconByTheme}
                </div>
            </Switch>
        </div>
    );
});
