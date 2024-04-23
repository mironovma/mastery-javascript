import { Toaster } from "sonner";
import { observer } from "mobx-react-lite";
import { Suspense, useEffect } from "react";

import { AppRouter } from "@/app/providers/router";
import { Navbar } from "@/widgets/navbar";

export default observer(function App() {
    useEffect(() => {
        // Если в localSorage по ключу token, что-то есть, то проверяем авторизацию.
        // Т.е. если пользователь нажмет на кнопку "Выйти", то там этого токена не будет и
        // action не отработает
        if (localStorage.getItem("token")) {
            // auth.checkAuth();
        }
    }, []);

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
