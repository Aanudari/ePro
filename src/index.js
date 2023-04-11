import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/user_ui.css";
import "./styles/table.scss";
import "./styles/button.scss";
import "./styles/userui.scss";
import "./styles/usermain.scss";
import "./styles/folder.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { ContextProvider } from "./contexts/ContextProvider";
import ContextWrapper from "./contexts/ContextWrapper";
import { QueryClient, QueryClientProvider } from "react-query";
import "./fonts/TahomaRegularfont.ttf";
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextWrapper>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ContextProvider>
  </ContextWrapper>
);
