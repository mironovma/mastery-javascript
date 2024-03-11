import { memo } from "react";

import { ThemeSwitcher } from "@/features/theme-switcher";

const MainPage = () => {
    return (
        <div>
            <h3>Main Page</h3>
            <ThemeSwitcher />
        </div>
    );
};

export default memo(MainPage);
