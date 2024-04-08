import { memo } from "react";

import { UserSettings } from "@/features/user-settings";
import { LearnBlock } from "@/entities/learn-block";

export const LearnSection = memo(() => {
    return (
        <div className="flex flex-col gap-4">
            <LearnBlock />
            <UserSettings />
        </div>
    );
});
