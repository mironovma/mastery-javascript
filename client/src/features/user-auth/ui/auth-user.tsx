import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { AuthControll, AuthModal } from "@/entities/auth-modal";
import { cn } from "@/shared/lib/utils";
import { useMobxStore } from "@/shared/hooks/useMobxStore";

interface AuthUserProps {
    className?: string;
    open?: boolean;
}

export const AuthUser = observer(({ className, open }: AuthUserProps) => {
    const { auth } = useMobxStore();
    const navigate = useNavigate();

    return (
        <div className={cn("", className)}>
            {auth.isAuth ? (
                <AuthControll
                    username={auth.user.username}
                    email={auth.user.email}
                    onLogout={() => {
                        auth.logout();
                        navigate("/");
                    }}
                />
            ) : (
                <AuthModal open={open} />
            )}
        </div>
    );
});
