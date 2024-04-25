import { ReactNode, useState } from "react";
import { observer } from "mobx-react-lite";

import { useMobxStore } from "@/shared/hooks/useMobxStore";
import { Button } from "@/shared/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTrigger,
} from "@/shared/ui/dialog";

import { LoginModal } from "./login-modal/login-modal";
import { RegistrationModal } from "./registration-modal/registration-modal";
import { ForgotPasswordModal } from "./forgot-password/forgot-password-modal";

interface AuthModalProps {
    className?: string;
    trigger?: ReactNode;
    open?: boolean;
}

export const AuthModal = observer(
    ({ className, trigger, open }: AuthModalProps) => {
        const { auth } = useMobxStore();

        const [isRegistration, setIsRegistration] = useState<boolean>(false);
        const [isForgotPassword, setIsForgotPassword] =
            useState<boolean>(false);

        return (
            <div className={className}>
                <Dialog defaultOpen={open}>
                    {!open && (
                        <DialogTrigger asChild>
                            {trigger ?? (
                                <Button className="text-white" variant="link">
                                    Вход и регистрация
                                </Button>
                            )}
                        </DialogTrigger>
                    )}
                    <DialogContent>
                        {isRegistration ? (
                            <RegistrationModal />
                        ) : !isForgotPassword ? (
                            <LoginModal
                                onForgot={() => setIsForgotPassword(true)}
                            />
                        ) : (
                            <ForgotPasswordModal
                                onAuth={() => setIsForgotPassword(false)}
                            />
                        )}

                        <DialogDescription className="flex gap-1 -mt-2">
                            {!isRegistration
                                ? "Нет аккаунта?"
                                : "Уже есть аккаунт?"}
                            <Button
                                variant="link"
                                className="p-0 m-0 h-auto"
                                onClick={(e) => {
                                    e.preventDefault();
                                    auth.setError(null);
                                    setIsRegistration((prev) => !prev);
                                }}
                            >
                                {!isRegistration
                                    ? "Зарегистрируйтесь!"
                                    : "Авторизируйтесь!"}
                            </Button>
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            </div>
        );
    },
);
