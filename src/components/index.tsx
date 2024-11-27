import { RoutePages } from "./route-pages.tsx";
import { Header } from "./header.tsx";
import { Navigation } from "./navigation.tsx";
import {
  helperExcessMargin,
  helperUnnecessaryNavigation
} from "../utils/usefulFunc.ts";
import { useLocation } from "react-router-dom";
import loadingGif from "../../public/components/other/loading.gif";
import styles from "../styles/common.module.scss";
import { useControlCenter } from "../hooks/useControlCenter.tsx";
import { useGetBalance } from "../hooks/useGetBalance.tsx";

export const Layout = () => {
  const { pathname } = useLocation();
  const isMargin: boolean = helperExcessMargin(pathname);
  const { isControllerLoading, isRequest, address } = useControlCenter();
  const { loading, balance } = useGetBalance();

  return (
    <>
      {isControllerLoading || loading || isRequest ? (
        <div className={styles.loading}>
          <img src={loadingGif} alt="loading" />
        </div>
      ) : (
        <div style={{ margin: isMargin ? "" : "0 5%" }}>
          <Header
            pathname={pathname}
            balance={balance}
            address={address as string}
          />
          <RoutePages balance={balance} address={address as string} />
          {helperUnnecessaryNavigation(pathname) ? null : (
            <Navigation pathname={pathname} />
          )}
        </div>
      )}
    </>
  );
};
