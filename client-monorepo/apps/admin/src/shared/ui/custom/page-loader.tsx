import { memo, useEffect } from "react";
import { LoaderCircleIcon } from "lucide-react";

export const PageLoader = memo(() => {
    useEffect(() => {
        document.body.style.overflowY = "hidden";

        return () => {
            document.body.style.overflowY = "auto";
        };
    }, []);

    return (
        <div className="absolute inset-0 w-full h-screen bg-white/10 flex justify-center items-center">
            <LoaderCircleIcon className="size-10 text-black/50 dark:text-white/50 animate-spin" />
        </div>
    );
});
