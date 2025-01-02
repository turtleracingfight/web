import { FC } from "react";
import { BtnConnectTg } from "../components/buttons.tsx";
import { CURRENCY } from "../constants/links.ts";
import connectTurtle from "/pages/ct-ton.avif";
import { IAddressWallet } from "../types/ts-common.ts";
import styles from "../styles/pages/connect-wallet.module.scss";
import { TConnectWallet } from "../types/ts-connect-wallet.ts";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useLang } from "../hooks/useLang.tsx";
import { LANGS } from "../constants/langs.ts";

const ConnectWalletBtn: FC<TConnectWallet> = ({ lang }) => {
  return (
    <div className={styles.container_connect}>
      <p>{LANGS[lang].connectForStart}</p>
      <BtnConnectTg text={LANGS[lang].connect} />
    </div>
  );
};

const ConnectedWallet: FC<TConnectWallet> = ({ ton, lang }) => {
  return (
    <div className={styles.container_connected}>
      <p>{LANGS[lang].balance}:</p>
      <p>
        {ton} {CURRENCY}
      </p>
      <TonConnectButton />
    </div>
  );
};

export const ConnectWallet: FC<IAddressWallet> = ({ balance, address = 0 }) => {
  const { lang } = useLang();
  return (
    <div className={styles.container}>
      {address ? (
        <ConnectedWallet ton={balance} lang={lang} />
      ) : (
        <ConnectWalletBtn lang={lang} />
      )}
      <div className={styles.container_footer}>
        <div className={styles.container_footer_back}></div>
        <img src={connectTurtle} alt="connect-turtle" />
      </div>
    </div>
  );
};
