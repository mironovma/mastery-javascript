import { ReactElement } from "react";

import { FeatureFlags } from "../types/features";

interface ToggleFeaturesProps {
    feature: keyof FeatureFlags;
    on: ReactElement;
    off?: ReactElement;
}

/**
 * TODO: из БД вытаскивать фича-флга у пользователя и, если он true, то return on.
 */
export const ToggleFeatures = ({ feature, on, off }: ToggleFeaturesProps) => {
    if (on) return on;

    if (off) return off;

    return <></>;
};
