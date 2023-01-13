import ReactDOM from "react-dom/client";
import React from "react";
import { Global } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/ko";
import "pretendard/dist/web/static/pretendard.css";
import App from "./App";
import globalCss from "./styles/global";
import theme from "./styles/theme";

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
