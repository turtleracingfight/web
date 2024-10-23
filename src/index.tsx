import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Layout } from "./components";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { THEME } from "@tonconnect/ui";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TonConnectUIProvider
        uiPreferences={{ theme: THEME.DARK }}
        manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
      >
        <Layout />
      </TonConnectUIProvider>
    </BrowserRouter>
  </StrictMode>
);
