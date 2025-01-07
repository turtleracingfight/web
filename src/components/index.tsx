import { RoutePages } from "./route-pages.tsx";
import { Header } from "./header.tsx";
import { Navigation } from "./navigation.tsx";
import { helperExcessMargin } from "../utils/usefulFunc.ts";
import { useLocation } from "react-router-dom";
import { useControlCenter } from "../hooks/useControlCenter.tsx";
import { Loader } from "./loader.tsx";
import { Errors } from "./errors.tsx";
import { useEffect } from "react";
import styles from "../styles/common.module.scss";
import { useStoreLang } from "../store/store-lang.ts";
import { useStoreLoadings } from "../store/store-loadings.ts";

export const Layout = () => {
  const { pathname } = useLocation();
  const { isControllerLoading, address, setOptions } = useControlCenter();
  const { lang, initLang } = useStoreLang();
  const isLoadingRequest = useStoreLoadings(state => state.isLoadingRequest);
  const isLoadingBalance = useStoreLoadings(state => state.isLoadingBalance);

  useEffect(() => {
    initLang();
  }, []);

  useEffect(() => {
    if (lang) setOptions({ language: lang });
  }, [lang]);

  const isMargin: boolean = helperExcessMargin(pathname);

  return isControllerLoading || isLoadingBalance ? (
    <Loader />
  ) : (
    <>
      <Errors />
      <div
        className={styles.index}
        style={{
          margin: isMargin ? "" : "0 5%",
          overflow: isLoadingRequest ? "hidden" : "auto"
        }}
      >
        {isLoadingRequest && <Loader isLoadingRequest={isLoadingRequest} />}
        <Header pathname={pathname} address={address as string} />
        <RoutePages address={address as string} />
        <Navigation pathname={pathname} />
      </div>
    </>
  );
};
