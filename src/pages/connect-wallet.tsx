import { FC, useEffect, useState } from "react";
import { BtnCommon, BtnConnectTg } from "../components/buttons.tsx";
import { CURRENCY } from "../constants/links.ts";
import { requestTon } from "../api/connect.ts";
import connectTurtle from "/pages/ct-ton.png";
import { IAddressWallet } from "../types/ts-common.ts";
import styles from "../styles/pages/connect-wallet.module.scss";
import { TConnectWallet } from "../types/ts-connect-wallet.ts";

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
      <p>Ваша баланс:</p>
      <p>
        {ton.toFixed(2)} {CURRENCY}
      </p>
      <BtnCommon text={"Пополнить баланс"} />
    </div>
  );
};

export const ConnectWallet: FC<IAddressWallet> = ({ address }) => {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (address) requestTon.getTonBalance(address, setBalance);
  }, [address]);

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
