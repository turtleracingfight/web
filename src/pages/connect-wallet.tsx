import { FC } from "react";
import { BtnConnectTg } from "../components/buttons.tsx";
import { CURRENCY } from "../constants/links.ts";
import connectTurtle from "/pages/ct-ton.png";
import { IAddressWallet } from "../types/ts-common.ts";
import styles from "../styles/pages/connect-wallet.module.scss";
import { TConnectWallet } from "../types/ts-connect-wallet.ts";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";

const ConnectWalletBtn = () => {
  return (
    <div className={styles.container_connect}>
      <p>Для участия в игре необходимо подключить кошелек и сделать ставку</p>
      <BtnConnectTg />
    </div>
  );
};

const ConnectedWallet: FC<TConnectWallet> = ({ ton }) => {
  return (
    <div className={styles.container_connected}>
      <p>Ваш баланс:</p>
      <p>
        {ton} {CURRENCY}
      </p>
      <TonConnectButton />
    </div>
  );
};

export const ConnectWallet: FC<IAddressWallet> = ({ balance, address = 0 }) => {
  return (
    <div className={styles.container}>
      {address ? <ConnectedWallet ton={balance} /> : <ConnectWalletBtn />}
      <div className={styles.container_footer}>
        <div className={styles.container_footer_back}></div>
        {!address && <img src={connectTurtle} alt="connect-turtle" />}
      </div>
    </div>
  );
};
