import { Locales } from "@tonconnect/ui";

export type TSettings = {
  lang: Locales;
  selectLang: (lang: Locales) => void;
};
