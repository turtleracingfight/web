import { create } from "zustand";
import { Locales } from "@tonconnect/ui";
import { IStoreLang } from "../types/ts-store-lang.ts";

export const useStoreLang = create<IStoreLang>(set => ({
  lang: "en",
  selectLang: (lang: Locales) => {
    window.localStorage.setItem("lang", lang);
    set({ lang });
  },
  initLang: () => {
    let lang = window.localStorage.getItem("lang") as Locales;
    if (!lang) {
      window.localStorage.setItem("lang", "en");
      lang = "en";
    }
    set({ lang });
  }
}));

export const getLang = () => useStoreLang.getState().lang;
