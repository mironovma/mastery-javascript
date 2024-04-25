import { observer } from "mobx-react-lite";

import { useMobxStore } from "@/shared/hooks/useMobxStore";

import { ForgotConfirmCodeForm } from "./forgot-confirm-code-form";
import { ForgotSendCodeForm } from "./forgot-send-code-form";
import { ForgotSetPasswordForm } from "./forgot-set-password-form";

export const ForgotPasswordModal = observer(
    ({ onAuth }: { onAuth: () => void }) => {
        const { auth } = useMobxStore();

        if (auth.resetPasswordState === "awaitingNewPassword") {
            return <ForgotSetPasswordForm />;
        }

        if (auth.resetPasswordState === "confirmCode") {
            return <ForgotConfirmCodeForm />;
        }

        return <ForgotSendCodeForm onAuth={onAuth} />;
    },
);
