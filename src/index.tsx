import { createRoot } from "react-dom/client";
import { Layout } from "./components";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { THEME } from "@tonconnect/ui";
import { MANIFEST_TON } from "./constants/env.ts";
import "@twa-dev/sdk";
import { StrictMode } from "react";
import telegramAnalytics from '@telegram-apps/analytics';

telegramAnalytics.init({
  token: 'eyJhcHBfbmFtZSI6IlR1cnRsZUZpZ2h0Qm90IiwiYXBwX3VybCI6Imh0dHBzOi8vdC5tZS9UdXJ0bGVGaWdodEJvdCIsImFwcF9kb21haW4iOiJodHRwczovL3R1cnRsZXJhY2luZ2ZpZ2h0LmdpdGh1Yi5pby93ZWIifQ==!gZWBB7HXHO2gPSCifk6298B7ag7CJkPfyFrwedXal4s=',
  appName: 'TurtleFightBot',
});

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
