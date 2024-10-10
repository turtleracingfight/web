import { useState } from "react";
import styles from "../styles/pages/preview.module.scss";
import arrowRight from "/components/other/arrow-right.svg";
import arrowLeft from "/components/other/arrow-left.svg";
import { CURRENCY, INFO_LIST } from "../constants/links.ts";

export const Preview = () => {
  const [current, setCurrent] = useState<number>(0);

  const handlerChangeNextCurrent = () => setCurrent(current + 1);
  const handlerChangePrevCurrent = () => setCurrent(current - 1);

  const isVisible = current >= INFO_LIST.length - 1;

  return (
    <div className={styles.container}>
      <div className={styles.container_content}>
        {current === 1 && (
          <>
            <div className={styles.elem}>
              <p>Поставили:</p>
              <p>0.4 {CURRENCY}</p>
            </div>
            <div className={styles.elem}>
              <p>Поставили:</p>
              <p>1.24 {CURRENCY}</p>
            </div>
            <div className={styles.elem}>
              <p>Поставили:</p>
              <p>0.62 {CURRENCY}</p>
            </div>
          </>
        )}
        <img src={INFO_LIST[current].svg} alt="info-picture" />
        <div className={styles.container_content_elipse}></div>
        <p>{INFO_LIST[current].text}</p>
      </div>
      <div className={styles.container_switcher}>
        <button
          disabled={!current}
          style={{ visibility: !current ? "hidden" : "visible" }}
          onClick={handlerChangePrevCurrent}
        >
          <img src={arrowLeft} alt="arrowLeft" />
        </button>
        <div>
          {INFO_LIST.map((el, index) => (
            <div
              key={el.id}
              style={{
                background:
                  index === current ? "white" : "rgba(112, 112, 112, 1)"
              }}
            ></div>
          ))}
        </div>
        <button
          disabled={isVisible}
          style={{ visibility: isVisible ? "hidden" : "visible" }}
          onClick={handlerChangeNextCurrent}
        >
          <img src={arrowRight} alt="arrowRight" />
        </button>
      </div>
    </div>
  );
};
