import { observer } from "mobx-react-lite";

import { AuthControll, AuthModal } from "@/entities/auth-modal";

import { cn } from "@/shared/lib/utils";
import { useMobxStore } from "@/shared/hooks/useMobxStore";
import { z } from "zod";
import { RegistrationSchema } from "@/entities/auth-modal/model/schema";

interface AuthUserProps {
    className?: string;
}

export const AuthUser = observer(({ className }: AuthUserProps) => {
    const { auth } = useMobxStore();

    const onLogin = (values: { email: string; password: string }) =>
        auth.login(values.email, values.password);

    const onRegistration = (values: z.infer<typeof RegistrationSchema>) =>
        auth.registration(values.email, values.password, values.username ?? "");

    return (
        <div className={cn("", className)}>
            {auth.isAuth ? (
                <AuthControll
                    username={auth.user.username}
                    email={auth.user.email}
                    onLogout={() => auth.logout()}
                />
            ) : (
                <AuthModal onSubmit={{ onLogin, onRegistration }} />
            )}
        </div>
    );
});
