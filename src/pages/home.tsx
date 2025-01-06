import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BtnCommon, BtnConnectTg } from "../components/buttons.tsx";
import { Timer } from "../components/timer.tsx";
import { ROUTES } from "../constants/route.tsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { CURRENCY, LIST_TURTLES, TURTLES_LINKS } from "../constants/links.ts";
import { IAddressWallet, TResultBets, TSwiper } from "../types/ts-common.ts";
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
let isBlockTime: null | number = null;
const TURTLES = Object.values(TURTLES_LINKS);
const MINI_LIST_TURTLES = LIST_TURTLES.map(el => (
  <div key={el.id}>
    <img width={40} height={40} src={el.img} alt="turtle" />
  </div>
));
export const Home: FC<IAddressWallet> = ({ address }) => {
  const navigate = useNavigate();
  const [turtle, setTurtle] = useState<number>(0);
  const [bets, setBets] = useState<TResultBets>({});
  const lang = useStoreLang(state => state.lang);
  const requestGetData = useStoreContact(state => state.requestGetData);
  const contractCenter = useStoreContact(state => state.contractCenter);

  const handlerNextTurtle = async () => {
    if (isBlockTime) return;
    if (!TURTLES[turtle + 1]) setTurtle(0);
    else setTurtle(turtle + 1);
    swiperInstance?.slideNext();
    handlerIsBlock();
  };

  const handlerPrevTurtle = async () => {
    if (isBlockTime) return;
    if (!turtle) setTurtle(() => TURTLES.length);
    setTurtle(state => state - 1);
    swiperInstance?.slidePrev();
    handlerIsBlock();
  };

  const handlerNavigateToAllTurtles = () => navigate(ROUTES.listTurtles);
  const handlerMakeBet = () => navigate(`${ROUTES.makeBet}/${turtle + 1}`);

  const handlerIsBlock = () => {
    isBlockTime = setTimeout(() => {
      isBlockTime = null;
    }, 350);
  };

  const getResults = async () => {
    const data = await requestGetData();
    if (data && Object.values(data).length) setBets(data);
  };

  useEffect(() => {
    (async () => {
      if (contractCenter) {
        await getResults();
      }
    })();
  }, [contractCenter]);

  const betsPlaced = countTotalTon(bets[`total${turtle + 1}`]);
  const betPlaced = countTotalTon(bets[`me${turtle + 1}`]);

  return (
    <div className={styles.container}>
      <div className={styles.container_turtles}>
        <div className={styles.container_turtles_ellipse}></div>
        <div className={styles.container_turtles_ellipse_shadow}></div>
        <div className={styles.container_turtles_header}>
          <img
            width={13}
            height={13}
            src={arrowleft}
            alt="arrow-left"
            onClick={handlerPrevTurtle}
          />
          <p>{TURTLES[turtle][lang]}</p>
          <img
            width={13}
            height={13}
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
        <div className={styles.container_turtles_content}></div>
        <div className={styles.container_turtles_turtle}>
          <Swiper
            onSwiper={swiper => {
              swiperInstance = swiper;
            }}
            onSlideChangeTransitionEnd={async swiper => {
              if (turtle === swiper.previousIndex) return;
              setTurtle(swiper.realIndex);
              await getResults();
            }}
            onSlideChange={async swiper => {
              if (turtle === swiper.realIndex) return;
              setTurtle(swiper.realIndex);
            }}
            slidesPerView="auto"
            loop={true}
            centeredSlides={true}
            className={styles.container_turtles_turtle_swiper}
            spaceBetween={5}
            allowTouchMove={!isBlockTime}
          >
            {Object.values(TURTLES).map(el => (
              <SwiperSlide
                key={el.id}
                className={styles.container_turtles_turtle_swiper_slider}
              >
                {el.id === turtle ? (
                  <img
                    className={
                      styles.container_turtles_turtle_swiper_slider_active
                    }
                    src={el.svg}
                    alt="turtle"
                  />
                ) : (
                  <img src={el.svg} alt="turtle" />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={styles.container_list}>
        <div className={styles.container_list_hero}>{MINI_LIST_TURTLES}</div>
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
