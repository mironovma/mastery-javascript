import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/app/app";
import { LangProvider } from "@/app/providers/lang-provider";
import { ThemeProvider } from "@/app/providers/theme-provider";

import "@/app/styles/index.scss";
import "@/shared/config/i18n/i18n";

const root = document.getElementById("root");

if (!root) throw new Error("Root container doesn't exist");

const container = createRoot(root);

container.render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <LangProvider>
                    <App />
                </LangProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
);
