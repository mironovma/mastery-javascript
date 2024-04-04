import { memo } from "react";

import { LearnBlock } from "@/entities/learn-block";

export const LearnSection = memo(() => {
    return (
        <div>
            <LearnBlock />
        </div>
    );
});
