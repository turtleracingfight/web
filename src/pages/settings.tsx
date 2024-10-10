import styles from "../styles/pages/settings.module.scss";
import { useState } from "react";
import { BtnCommon } from "../components/buttons.tsx";
import { LIST_LANGUAGES } from "../constants/links.ts";

export const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handlerLanguage = () => setIsOpen(!isOpen);

  return (
    <div className={styles.container}>
      <div
        className={styles.container_lang}
        style={{ height: isOpen ? "20vh" : "7vh" }}
      >
        <div className={styles.container_lang_button}>
          <BtnCommon
            height={"40px"}
            text={"Выберите язык"}
            handlerClick={handlerLanguage}
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
              <p onClick={handlerLanguage} key={el.id}>
                {el.lang} <img src={el.svg} alt="flag" />
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
