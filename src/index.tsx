import { createRoot } from "react-dom/client";
import { Layout } from "./components";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { THEME } from "@tonconnect/ui";
import { MANIFEST_TON } from "./constants/env.ts";
import "@twa-dev/sdk";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TonConnectUIProvider
        uiPreferences={{ theme: THEME.DARK }}
        manifestUrl={MANIFEST_TON}
      >
        <Layout />
      </TonConnectUIProvider>
    </BrowserRouter>
  </StrictMode>
);
