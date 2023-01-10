import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { Global } from "@emotion/react";
import globalCss from "./styles/global";
import "pretendard/dist/web/static/pretendard.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <Global styles={globalCss} />
    <App />
  </React.StrictMode>
);
