import { IAddressWallet } from "./ts-common.ts";

export interface IHeader extends IAddressWallet {
  isMargin: boolean;
}
