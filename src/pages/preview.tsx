import { useState } from "react";
import styles from "../styles/pages/preview.module.scss";
import arrowRight from "/components/other/arrow-right.svg";
import arrowLeft from "/components/other/arrow-left.svg";
import { CURRENCY, INFO_LIST } from "../constants/links.ts";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TSwiper } from "../types/ts-common.ts";
import { useLang } from "../hooks/useLang.tsx";
import { LANGS } from "../constants/langs.ts";

let swiperInstance: TSwiper = null;
export const Preview = () => {
  const { lang } = useLang();
  const [current, setCurrent] = useState<number>(0);

  const handlerChangeNextCurrent = () => {
    setCurrent(current + 1);
    swiperInstance?.slideNext();
  };
  const handlerChangePrevCurrent = () => {
    setCurrent(current - 1);
    swiperInstance?.slidePrev();
  };

  const isVisible = current >= INFO_LIST.length - 1;

  const slides = INFO_LIST.map(el => {
    return (
      <SwiperSlide
        key={el.id}
        className={styles.container_content}
        style={{
          height: "25vh"
        }}
      >
        <div className={styles.container_content_swiperSlide}>
          {el.id === 2 ? (
            <>
              <div className={styles.elem}>
                <p>{LANGS[lang].allPeopleSet}: 10.5 {CURRENCY}</p>
                <p>0.4 {CURRENCY}</p>
              </div>
              <div className={styles.elem}>
                <p>{LANGS[lang].allPeopleSet}: 13.5 {CURRENCY}</p>
                <p>1.24 {CURRENCY}</p>
              </div>
              <div className={styles.elem}>
                <p>{LANGS[lang].allPeopleSet}: 2.5 {CURRENCY}</p>
                <p>0.62 {CURRENCY}</p>
              </div>
            </>
          ) : null}
          <img
            src={el.svg}
            alt="info-picture"
            style={{ height: "100%", width: "95%" }}
          />
        </div>
        <div className={styles.container_content_elipse}></div>
        <p>{el[lang]}</p>
      </SwiperSlide>
    );
  });

  return (
    <div className={styles.container}>
      <Swiper
        onSwiper={swiper => {
          swiperInstance = swiper;
        }}
        onSlideChange={swiper => {
          setCurrent(swiper.realIndex);
        }}
        effect={"fade"}
        pagination={{
          clickable: true
        }}
        className="mySwiper"
        initialSlide={current}
      >
        {slides}
      </Swiper>
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
