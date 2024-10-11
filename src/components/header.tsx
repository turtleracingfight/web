import { FC, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CURRENCY } from "../constants/links.ts";
import { ROUTES } from "../constants/route.tsx";
import { IHeader } from "../types/ts-header.ts";
import { requestTon } from "../api/connect.ts";
import settings from "/pages/in-settings.svg";
import wallet from "/pages/in-wallet.svg";
import styles from "../styles/components/header.module.scss";
import {
  helperExcessMargin,
  helperUnnecessaryHeader
} from "../utils/usefulFunc.ts";

let localAddress: string | undefined = undefined;
export const Header: FC<IHeader> = memo(({ address, pathname }) => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number>(0);

  const handlerConnectWallet = () => navigate(ROUTES.connect);
  const handlerNavigateToSettings = () => navigate(ROUTES.settings);

  if (localAddress !== address) localAddress = address;

  useEffect(() => {
    if (address) requestTon.getTonBalance(address, setBalance);
  }, [address]);

  useEffect(() => {
    if (!address) setBalance(0);
  }, [address]);

  const isMargin: boolean = helperExcessMargin(pathname);
  const isUnnecessary: boolean = helperUnnecessaryHeader(pathname);

  return (
    <div
      className={styles.container}
      style={{
        width: isMargin ? "90%" : "",
        display: isUnnecessary ? "none" : "flex"
      }}
    >
      <div>
        <img
          src={settings}
          alt="settings"
          onClick={handlerNavigateToSettings}
        />
      </div>
      <div className={styles.container_wallet}>
        <p>{balance ? `${balance.toFixed(2)} ${CURRENCY}` : "Подключить"}</p>
        <img onClick={handlerConnectWallet} src={wallet} alt="wallet" />
      </div>
    </div>
  );
});
