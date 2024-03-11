import { useTheme } from "@/app/providers/ThemeProvider";
import { Button } from "@/shared/ui/button";

export const ThemeSwitcher = () => {
    const { setTheme } = useTheme();

    return (
        <div>
            <Button onClick={() => setTheme("light")}>Light</Button>
            <Button onClick={() => setTheme("dark")}>Dark</Button>
        </div>
    );
};
