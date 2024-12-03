import styles from "../styles/pages/settings.module.scss";
import { FC, useState } from "react";
import { BtnCommon } from "../components/buttons.tsx";
import { LIST_LANGUAGES } from "../constants/links.ts";
import { LANGS } from "../constants/langs.ts";
import { Locales } from "@tonconnect/ui";
import { TSettings } from "../types/ts-settings.ts";

export const Settings: FC<TSettings> = ({ selectLang, lang }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModalLang = () => setIsOpen(!isOpen);

  const handlerLanguage = (lang: Locales) => {
    setIsOpen(!isOpen);
    selectLang(lang);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.container_lang}
        style={{ height: isOpen ? "20vh" : "7vh" }}
      >
        <div className={styles.container_lang_button}>
          <BtnCommon
            text={LANGS[lang].selectLang}
            handlerClick={openModalLang}
            rtArrow={isOpen}
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              paddingLeft: "5%",
              outline: "none"
            }}
          />
        </div>
        {isOpen && (
          <div className={styles.container_lang_choose}>
            {LIST_LANGUAGES.map(el => (
              <p onClick={() => handlerLanguage(el.lang)} key={el.id}>
                {el[lang]} <img src={el.svg} alt="flag" />
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
