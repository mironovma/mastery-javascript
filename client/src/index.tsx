import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "./app/providers/ThemeProvider";

import App from "@/app/app";

import "@/app/styles/index.scss";

const root = document.getElementById("root");

if (!root) throw new Error("Root not found");

const container = createRoot(root);

const queryClient = new QueryClient();

container.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
