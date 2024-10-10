import { RoutePages } from "./route-pages.tsx";
import { Header } from "./header.tsx";
import { Navigation } from "./navigation.tsx";
import {
  helperExcessMargin,
  helperUnnecessaryHeader,
  helperUnnecessaryNavigation
} from "../utils/usefulFunc.ts";
import { useLocation } from "react-router-dom";
import { useTonWallet } from "@tonconnect/ui-react";

export const Layout = () => {
  const { pathname } = useLocation();
  const isMargin: boolean = helperExcessMargin(pathname);
  const wallet = useTonWallet();
  const addressTon = wallet?.account?.address;
  return (
    <>
      <div style={{ margin: isMargin ? "" : "0 5%" }}>
        {helperUnnecessaryHeader(pathname) ? null : (
          <Header address={addressTon} isMargin={isMargin} />
        )}
        <RoutePages address={addressTon} />
        {helperUnnecessaryNavigation(pathname) ? null : <Navigation />}
      </div>
    </>
  );
};
