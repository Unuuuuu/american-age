import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { Global } from "@emotion/react";
import globalCss from "./styles/global";
import "pretendard/dist/web/static/pretendard.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import "dayjs/locale/ko";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <Global styles={globalCss} />
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ko"}>
        <App />
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
