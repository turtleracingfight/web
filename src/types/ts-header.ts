import { IAddressWallet } from "./ts-common.ts";
import { Locales } from "@tonconnect/ui";

export interface IHeader extends IAddressWallet {
  pathname: string;
  lang: Locales;
}
