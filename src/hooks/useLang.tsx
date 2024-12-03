import { useEffect, useState } from "react";
import { Locales } from "@tonconnect/ui";

export const initLang = (set?: (value: Locales) => void) => {
  let lang = window.localStorage.getItem("lang") as Locales;
  if (!lang) {
    window.localStorage.setItem("lang", "en");
    lang = "en";
  }
  if (set) set(lang);
};

export const useLang = () => {
  const [lang, setLang] = useState<Locales>("en");
  const selectLang = (lang: Locales) => {
    window.localStorage.setItem("lang", lang);
    setLang(lang);
  };

  useEffect(() => {
    initLang(setLang);
  }, []);

  return {
    lang,
    selectLang
  };
};
