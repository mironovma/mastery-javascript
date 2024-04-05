import { memo } from "react";

import { LearnSection } from "@/widgets/learn-section";
import { UserSettings } from "@/features/user-settings";

const AppPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <LearnSection />
            <UserSettings />
        </div>
    );
};

export default memo(AppPage);
