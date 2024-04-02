import { memo, useLayoutEffect } from "react";

import { AuthUser } from "@/features/user-auth";
import { useMobxStore } from "@/shared/hooks/useMobxStore";
import { toast } from "sonner";

const AuthorizationPage = () => {
    const { auth } = useMobxStore();

    useLayoutEffect(() => {
        let timerId: NodeJS.Timeout;
        if (auth.isAuth) {
            toast.info("Вы уже авторизованы", { position: "bottom-center" });

            timerId = setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        } else {
            toast.info("Требуется авторизация", {
                position: "bottom-center",
            });
        }

        return () => {
            clearTimeout(timerId);
        };
    }, []);

    if (auth.isAuth) {
        return (
            <div className="absolute inset-0 w-full h-full overflow-y-hidden bg-white/10" />
        );
    }

    return <AuthUser open={true} />;
};
export default memo(AuthorizationPage);
