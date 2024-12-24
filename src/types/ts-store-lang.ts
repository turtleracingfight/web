import { Locales } from "@tonconnect/ui";

export interface IStoreLang {
  lang: Locales;
  initLang: () => void;
  selectLang: (lang: Locales) => void;
}
