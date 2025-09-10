import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initializeI18n } from "@/lib/i18n";
import "./index.css";

initializeI18n();

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
