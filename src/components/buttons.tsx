import tg from "/components/other/in-ton.svg";
import styles from "../styles/common.module.scss";
import arrowRight from "/components/other/arrow-right.svg";
import { TBtnCommon } from "../types/ts_buttons.ts";
import { FC } from "react";
import { useTonConnectModal } from "@tonconnect/ui-react";

export const BtnConnectTg = () => {
  const { open } = useTonConnectModal();
  return (
    <button onClick={open} className={styles.bt_connect_tg}>
      <div>
        <img src={tg} alt="connect-ton" />
      </div>
      <p>Подключить кошелёк</p>
    </button>
  );
};

export const BtnCommon: FC<TBtnCommon> = ({
  text,
  style,
  handlerClick,
  rtArrow
}) => (
  <button
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
