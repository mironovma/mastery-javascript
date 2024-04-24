import { memo, useEffect } from "react";
import JSConfetti from "js-confetti";

export const Confetti = memo(() => {
    useEffect(() => {
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti();
    }, []);

    return <></>;
});
