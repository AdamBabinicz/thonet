import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./lib/i18n";
import "leaflet/dist/leaflet.css"; // <--- DODAJ TĘ LINIĘ
import "./index.css";

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
