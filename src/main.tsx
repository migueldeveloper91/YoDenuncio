import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./tailwind.css";

import "@ionic/react";
import { setupIonicReact } from "@ionic/react";
import "@ionic/react/css/core.css";

setupIonicReact();

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
