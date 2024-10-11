import { FC, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BtnCommon, BtnConnectTg } from "../components/buttons.tsx";
import { Timer } from "../components/timer.tsx";
import { ROUTES } from "../constants/route.tsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { CURRENCY, LIST_TURTLES, TURTLES } from "../constants/links.ts";
import { IAddressWallet, TSwiper } from "../types/ts-common.ts";
import arrowright from "/components/other/arrow-right.svg";
import arrowleft from "/components/other/arrow-left.svg";
import styles from "../styles/pages/home.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import "../index.css";

let swiperInstance: TSwiper = null;
export const Home: FC<IAddressWallet> = ({ address }) => {
  const navigate = useNavigate();
  const [turtle, setTurtle] = useState<number>(0);
  const [isBlock, setIsBlock] = useState<boolean>(false);

  const handlerNextTurtle = () => {
    if (isBlock) return;
    if (!TURTLES[turtle + 1]) setTurtle(0);
    else setTurtle(state => state + 1);
    swiperInstance?.slideNext();
    handlerIsBlock();
  };
  const handlerPrevTurtle = () => {
    if (isBlock) return;
    if (!turtle) setTurtle(() => TURTLES.length);
    setTurtle(state => state - 1);
    swiperInstance?.slidePrev();
    handlerIsBlock();
  };
  const handlerNavigateToAllTurtles = () => navigate(ROUTES.listTurtles);
  const handlerMakeBet = () => navigate(ROUTES.makeBet);
  const handlerIsBlock = () => {
    setIsBlock(true);
    setTimeout(() => setIsBlock(false), 350);
  };

  const memoListTurtles = useMemo(
    () =>
      LIST_TURTLES.map(el => (
        <div key={el.id}>
          <img src={el.img} alt="turtle" />
        </div>
      )),
    []
  );

  return (
    <div className={styles.container}>
      <div className={styles.container_turtles}>
        <Swiper
          onSwiper={swiper => (swiperInstance = swiper)}
          slidesPerView="auto"
          loop={true}
          centeredSlides={true}
          spaceBetween={30}
          allowTouchMove={false}
        >
          {TURTLES.map(el => (
            <SwiperSlide
              key={el.id}
              className={styles.container_turtles_slider}
            >
              {el.id === turtle ? (
                <img
                  className={styles.container_turtles_slider_active}
                  src={el.svg}
                  alt="turtle"
                />
              ) : (
                <img style={{ width: "90%" }} src={el.svg} alt="turtle" />
              )}
            </SwiperSlide>
          ))}
          <div className={styles.container_turtles_additional}></div>
          <div className={styles.container_turtles_header}>
            <div className={styles.container_turtles_header_ellipse}></div>
            <div className={styles.container_turtles_header_ellipse}></div>
            <img src={arrowleft} alt="arrow-left" onClick={handlerPrevTurtle} />
            <p className={styles.container_turtles_header_name}>
              {TURTLES[turtle].name}
            </p>
            <img
              src={arrowright}
              alt="arrow-right"
              onClick={handlerNextTurtle}
            />
          </div>
          <div className={styles.container_turtles_ton}>
            <p>Поставили:</p>
            <p>0.4 {CURRENCY}</p>
          </div>
        </Swiper>
      </div>
      <div className={styles.container_bl}>
        <div className={styles.container_bl_list}>
          <div className={styles.container_bl_list_hero}>{memoListTurtles}</div>
          <BtnCommon
            handlerClick={handlerNavigateToAllTurtles}
            text={"Список черепах"}
          />
        </div>
        <div className={styles.container_bl_footer}>
          <Timer />
          <div className={styles.container_bl_footer_button}>
            <div className={styles.container_bl_footer_button_ellipse}></div>
            {address ? (
              <BtnCommon
                handlerClick={handlerMakeBet}
                text={"Сделать ставку"}
              />
            ) : (
              <BtnConnectTg />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
