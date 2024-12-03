import { CSSProperties } from "react";

export type TBtnCommon = {
  text: string;
  style?: CSSProperties;
  handlerClick?: () => void;
  rtArrow?: boolean;
  disabled?: boolean;
};

export type TBtnConnectWallet = {
  text: string;
};
