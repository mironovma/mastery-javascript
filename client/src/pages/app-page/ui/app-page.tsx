import { memo } from "react";

import { LearnSection } from "@/widgets/learn-section";

const AppPage = () => {
    return (
        <div>
            <LearnSection />
        </div>
    );
};

export default memo(AppPage);
