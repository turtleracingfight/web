import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { CURRENCY } from "../constants/links.ts";
import { ROUTES } from "../constants/route.tsx";
import { IHeader } from "../types/ts-header.ts";
import settings from "/pages/in-settings.svg";
import wallet from "/pages/in-wallet.svg";
import styles from "../styles/components/header.module.scss";
import { helperExcessMargin } from "../utils/usefulFunc.ts";
import { LANGS } from "../constants/langs.ts";
import { useStoreLang } from "../store/store-lang.ts";
import { useStoreContact } from "../store/store-contract.ts";

let localAddress: string | undefined = undefined;
export const Header: FC<IHeader> = memo(({ address, pathname }) => {
  const navigate = useNavigate();
  const lang = useStoreLang(state => state.lang);
  const balance = useStoreContact(state => state.balance);

  const handlerConnectWallet = () => navigate(ROUTES.connect);
  const handlerNavigateToSettings = () => navigate(ROUTES.settings);

  if (localAddress !== address) localAddress = address;

  const isMargin: boolean = helperExcessMargin(pathname);

  return (
    <div className={styles.container} style={{ width: isMargin ? "90%" : "" }}>
      <div>
        <img
          src={settings}
          alt="settings"
          onClick={handlerNavigateToSettings}
        />
      </div>
      <div className={styles.container_wallet} onClick={handlerConnectWallet}>
        <p>
          {balance && address ? `${balance} ${CURRENCY}` : LANGS[lang].connect}
        </p>
        <img src={wallet} alt="wallet" />
      </div>
    </div>
  );
});
