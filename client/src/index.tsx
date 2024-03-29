import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/app/app";
import { LangProvider } from "@/app/providers/lang-provider";
import { ThemeProvider } from "@/app/providers/theme-provider";
// mobx provider - TODO: оставить в качестве примера, но закоментировать и переделать на Redux
import { StoreMobxProvider } from "@/app/providers/store-mobx-provider";

import "@/app/styles/index.scss";
import "@/shared/config/i18n/i18n";

const root = document.getElementById("root");

if (!root) throw new Error("Root container doesn't exist");

const container = createRoot(root);

container.render(
    <StrictMode>
        <BrowserRouter>
            <StoreMobxProvider>
                <ThemeProvider>
                    <LangProvider>
                        <App />
                    </LangProvider>
                </ThemeProvider>
            </StoreMobxProvider>
        </BrowserRouter>
    </StrictMode>,
);
