import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home.tsx";
import { ConnectWallet } from "../pages/connect-wallet.tsx";
import { LIST_ROUTES, ROUTES } from "../constants/route.tsx";
import { IAddressWallet } from "../types/ts-common.ts";
import { FC } from "react";

export const RoutePages: FC<IAddressWallet> = ({ balance, address }) => {
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
      {LIST_ROUTES.map(el => (
        <Route path={el.path} key={el.path} element={el.component} />
      ))}
    </Routes>
  );
};
