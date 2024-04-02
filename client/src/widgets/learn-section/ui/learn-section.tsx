import { LearnBlock } from "@/entities/learn-block";
import { memo } from "react";

export const LearnSection = memo(() => {
    return (
        <div>
            <LearnBlock />
        </div>
    );
});
