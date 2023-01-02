import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./App.jsx";

const app = document.getElementById("root");
const root = createRoot(app);

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
