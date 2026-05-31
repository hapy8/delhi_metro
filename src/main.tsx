import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import { App } from "./App";

// Register service worker for PWA (auto-updates)
registerSW({ immediate: true });

// Mount React app
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element #root not found.");

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
