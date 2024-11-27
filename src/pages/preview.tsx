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

let swiperInstance: TSwiper = null;
let time: number | null | undefined = null;
export const Preview = () => {
  const [current, setCurrent] = useState<number>(0);
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const handlerChangeNextCurrent = () => {
    setCurrent(current + 1);
    swiperInstance?.slideNext();
  };
  const handlerChangePrevCurrent = () => {
    setCurrent(current - 1);
    swiperInstance?.slidePrev();
  };

  const handlerDebounceMove = e => {
    console.log(e);
    setIsScroll(true);
    if (time) clearTimeout(time);
    time = setTimeout(() => setIsScroll(false), 100);
  };

  const isVisible = current >= INFO_LIST.length - 1;

  return (
    <div className={styles.container}>
      <Swiper
        onSwiper={swiper => {
          swiperInstance = swiper;
        }}
        onSlideChange={swiper => {
          console.log(swiper);
          setCurrent(swiper.realIndex);
        }}
        onSliderMove={handlerDebounceMove}
        effect={"fade"}
        pagination={{
          clickable: true
        }}
        className="mySwiper"
        initialSlide={current}
      >
        {INFO_LIST.map(el => {
          return (
            <SwiperSlide
              className={styles.container_content}
              style={{
                height: "30vh"
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {current === 1 && !isScroll && (
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
                <img
                  src={el.svg}
                  alt="info-picture"
                  style={{ height: "95%", width: "90%" }}
                />
              </div>
              <div className={styles.container_content_elipse}></div>
              <p>{el.text}</p>
            </SwiperSlide>
          );
        })}
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
