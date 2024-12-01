import tg from "/components/other/in-ton.svg";
import styles from "../styles/common.module.scss";
import arrowRight from "/components/other/arrow-right.svg";
import { TBtnCommon, TBtnConnectWallet } from "../types/ts_buttons.ts";
import { FC } from "react";
import { useTonConnectModal } from "@tonconnect/ui-react";

export const BtnConnectTg: FC<TBtnConnectWallet> = ({ text }) => {
  const { open } = useTonConnectModal();
  return (
    <button onClick={open} className={styles.bt_connect_tg}>
      <div>
        <img src={tg} alt="connect-ton" />
      </div>
      <p>{text}</p>
    </button>
  );
};

export const BtnCommon: FC<TBtnCommon> = ({
  text,
  style,
  handlerClick,
  rtArrow,
  disabled
}) => (
  <button
    disabled={disabled}
    onClick={handlerClick}
    style={{
      ...style
    }}
    className={styles.bt_default}
  >
    <p>{text}</p>
    <img
      src={arrowRight}
      alt="arrow-right"
      style={{ transform: rtArrow ? "rotate(90deg)" : "" }}
    />
  </button>
);
