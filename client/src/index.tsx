import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./app/providers/ThemeProvider";

import App from "@/app/app";

import "@/app/styles/index.scss";

const root = document.getElementById("root");

if (!root) throw new Error("Root not found");

const container = createRoot(root);

container.render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
);
