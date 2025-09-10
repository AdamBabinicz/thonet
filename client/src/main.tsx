import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initializeI18n } from "@/lib/i18n";
import "./index.css";

initializeI18n();

const container = document.getElementById("root");
const root = createRoot(container!);

const InitialLoader = () => (
  <div className="app-loader-container">
    <div className="spinner"></div>
  </div>
);

root.render(
  <React.StrictMode>
    <Suspense fallback={<InitialLoader />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
