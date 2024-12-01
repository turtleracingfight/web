import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home.tsx";
import { ConnectWallet } from "../pages/connect-wallet.tsx";
import { LIST_ROUTES, ROUTES } from "../constants/route.tsx";
import { IAddressWallet } from "../types/ts-common.ts";
import { FC } from "react";
import { TSettings } from "../types/ts-settings.ts";
import { Settings } from "../pages/settings.tsx";

export const RoutePages: FC<IAddressWallet & TSettings> = ({
  balance,
  address,
  selectLang,
  lang
}) => {
  return (
    <Routes>
      <Route
        path={ROUTES.home}
        key={ROUTES.home}
        element={<Home balance={balance} address={address} />}
      />
      <Route
        path={ROUTES.connect}
        key={ROUTES.connect}
        element={<ConnectWallet balance={balance} address={address} />}
      />
      <Route
        path={ROUTES.settings}
        key={ROUTES.settings}
        element={<Settings lang={lang} selectLang={selectLang} />}
      />
      {LIST_ROUTES.map(el => (
        <Route path={el.path} key={el.path} element={el.component} />
      ))}
    </Routes>
  );
};
