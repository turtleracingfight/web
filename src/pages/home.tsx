import { FC, useEffect, useMemo, useState } from "react";
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
import { countTotalTon } from "../utils/usefulFunc.ts";
import { LANGS } from "../constants/langs.ts";
import { useStoreContact } from "../store/store-contract.ts";
import { useStoreLang } from "../store/store-lang.ts";

let swiperInstance: TSwiper = null;
export const Home: FC<IAddressWallet> = ({ address }) => {
  const navigate = useNavigate();
  const [turtle, setTurtle] = useState<number>(0);
  const [isBlock, setIsBlock] = useState<boolean>(false);
  const [bets, setBets] = useState<{ [key: string]: string | bigint }>({});
  const { lang } = useStoreLang();
  const requestGetData = useStoreContact().requestGetData;

  const handlerNextTurtle = async () => {
    if (isBlock) return;
    if (!TURTLES[turtle + 1]) setTurtle(0);
    else setTurtle(turtle + 1);
    swiperInstance?.slideNext();
    handlerIsBlock();
  };

  const handlerPrevTurtle = async () => {
    if (isBlock) return;
    if (!turtle) setTurtle(() => TURTLES.length);
    setTurtle(state => state - 1);
    swiperInstance?.slidePrev();
    handlerIsBlock();
  };

  const handlerNavigateToAllTurtles = () => navigate(ROUTES.listTurtles);
  const handlerMakeBet = () =>
    navigate(`${ROUTES.makeBet}/${turtle + 1}`, { state: ROUTES.home });

  const handlerIsBlock = () => {
    setIsBlock(true);
    setTimeout(() => {
      setIsBlock(false);
    }, 350);
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

  useEffect(() => {
    (async () => {
      const data = await requestGetData();
      if (data && Object.values(data).length) setBets(data);
    })();
  }, []);

  const betsPlaced = countTotalTon(bets[`total${turtle + 1}`]);
  const betPlaced = countTotalTon(bets[`me${turtle + 1}`]);

  return (
    <div className={styles.container}>
      <div className={styles.container_turtles}>
        <Swiper
          onSwiper={swiper => {
            swiperInstance = swiper;
          }}
          onSlideChangeTransitionEnd={async () => {
            //here write Request
          }}
          onSlideChange={async swiper => {
            setTurtle(swiper.realIndex);
          }}
          slidesPerView="auto"
          loop={true}
          centeredSlides={true}
          spaceBetween={30}
          allowTouchMove={!isBlock}
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
              {TURTLES[turtle][lang]}
            </p>
            <img
              src={arrowright}
              alt="arrow-right"
              onClick={handlerNextTurtle}
            />
          </div>
          <div className={styles.container_turtles_ton}>
            <p>
              {LANGS[lang].allPeopleSet}: {betsPlaced}
            </p>
            <p>
              {betPlaced} {CURRENCY}
            </p>
          </div>
        </Swiper>
      </div>
      <div className={styles.container_list}>
        <div className={styles.container_list_hero}>{memoListTurtles}</div>
        <BtnCommon
          handlerClick={handlerNavigateToAllTurtles}
          text={LANGS[lang].listTurtles}
        />
      </div>
      <div className={styles.container_bl}>
        <div className={styles.container_bl_footer}>
          <Timer />
          <div className={styles.container_bl_footer_button}>
            <div className={styles.container_bl_footer_button_ellipse}></div>
            {address ? (
              <BtnCommon
                handlerClick={handlerMakeBet}
                text={LANGS[lang].makeBet}
              />
            ) : (
              <BtnConnectTg text={LANGS[lang].connectWallet} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
