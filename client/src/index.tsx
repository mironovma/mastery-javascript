import { createRoot } from "react-dom/client";

import App from "@/app/app";

import "@/app/styles/index.scss";

const root = document.getElementById("root");

if (!root) throw new Error("Root not found");

const container = createRoot(root);

container.render(<App />);
