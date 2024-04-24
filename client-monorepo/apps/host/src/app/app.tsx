import { Toaster, toast } from "sonner";
import { observer } from "mobx-react-lite";
import { Suspense, useEffect } from "react";

import { AppRouter } from "@/app/providers/router";
import { Navbar } from "@/widgets/navbar";
import { useMobxStore } from "@/shared/hooks/useMobxStore";

export default observer(function App() {
    // Проверяем: авторизован ли пользователь при входе в приложение один раз
    const { auth } = useMobxStore();

    useEffect(() => {
        // Если в localSorage по ключу token, что-то есть, то проверяем авторизацию.
        // Т.е. если пользователь нажмет на кнопку "Выйти", то там этого токена не будет и
        // action не отработает
        if (localStorage.getItem("token")) {
            auth.checkAuth();
        }
    }, [auth]);

    if (auth.error) {
        // TODO: сделать нотификацию для 500 ошибки, когда сервер не отвечает / отклоняет запрос
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        toast.error(auth.error.response?.data?.message, {
            position: "bottom-center",
        });
    }

    if (auth.successMessage) {
        toast.success(auth.successMessage, {
            position: "bottom-center",
        });
    }

    return (
        <Suspense fallback="">
            <div className="min-h-dvh">
                <Navbar />
                <AppRouter />
            </div>
            <Toaster richColors />
        </Suspense>
    );
});
