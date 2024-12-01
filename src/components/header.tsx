import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { CURRENCY } from "../constants/links.ts";
import { ROUTES } from "../constants/route.tsx";
import { IHeader } from "../types/ts-header.ts";
import settings from "/pages/in-settings.svg";
import gohome from "/pages/gohome.svg";
import wallet from "/pages/in-wallet.svg";
import styles from "../styles/components/header.module.scss";
import {
  helperExcessMargin,
  helperUnnecessaryHeader
} from "../utils/usefulFunc.ts";
import { LANGS } from "../constants/langs.ts";

let localAddress: string | undefined = undefined;
export const Header: FC<IHeader> = ({ address, pathname, balance, lang }) => {
  const navigate = useNavigate();
  console.log("here!");

  const isSettingsPage = pathname === ROUTES.settings;
  const handlerConnectWallet = () => navigate(ROUTES.connect);
  const handlerNavigateToSettings = () =>
    navigate(isSettingsPage ? ROUTES.home : ROUTES.settings);

  if (localAddress !== address) localAddress = address;

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
          src={isSettingsPage ? gohome : settings}
          alt="settings"
          onClick={handlerNavigateToSettings}
        />
      </div>
      <div className={styles.container_wallet}>
        <p>
          {balance ? `${balance.toFixed(2)} ${CURRENCY}` : LANGS[lang].connect}
        </p>
        <img onClick={handlerConnectWallet} src={wallet} alt="wallet" />
      </div>
    </div>
  );
};
