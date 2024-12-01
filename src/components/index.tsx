import { RoutePages } from "./route-pages.tsx";
import { Header } from "./header.tsx";
import { Navigation } from "./navigation.tsx";
import {
  helperExcessMargin,
  helperUnnecessaryNavigation
} from "../utils/usefulFunc.ts";
import { useLocation } from "react-router-dom";
import { useControlCenter } from "../hooks/useControlCenter.tsx";
import { useGetBalance } from "../hooks/useGetBalance.tsx";
import { Loader } from "./loader.tsx";
import { Errors } from "./errors.tsx";
import { useEffect } from "react";
import { initLang, useLang } from "../hooks/useLang.tsx";

export const Layout = () => {
  const { pathname } = useLocation();
  const { isControllerLoading, isRequest, address, setOptions } =
    useControlCenter();
  const { loading, balance } = useGetBalance();
  const { lang, selectLang } = useLang();

  useEffect(() => {
    initLang();
  }, []);

  useEffect(() => {
    if (lang) setOptions({ language: lang });
  }, [lang]);

  const isMargin: boolean = helperExcessMargin(pathname);

  return isControllerLoading || loading || isRequest ? (
    <Loader />
  ) : (
    <>
      <Errors />
      <div style={{ margin: isMargin ? "" : "0 5%" }}>
        <Header
          lang={lang}
          pathname={pathname}
          balance={balance}
          address={address as string}
        />
        <RoutePages
          balance={balance}
          address={address as string}
          lang={lang}
          selectLang={selectLang}
        />
        {helperUnnecessaryNavigation(pathname) ? null : (
          <Navigation pathname={pathname} />
        )}
      </div>
    </>
  );
};
